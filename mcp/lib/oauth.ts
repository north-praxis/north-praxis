import { createHmac, createHash, randomBytes, timingSafeEqual } from 'crypto';

// Stateless OAuth codes: base64url(JSON).base64url(HMAC-SHA256), signed
// with MCP_SHARED_SECRET. Single-user auto-approve flow.

function secret(): string {
  const s = process.env.MCP_SHARED_SECRET;
  if (!s) throw new Error('MCP_SHARED_SECRET is not set');
  return s;
}

function b64url(buf: Buffer): string {
  return buf.toString('base64url');
}

export interface CodePayload {
  iat: number;
  exp: number;
  nonce: string;
  code_challenge?: string;
  code_challenge_method?: string;
  redirect_uri: string;
  client_id: string;
}

export function makeCode(input: {
  code_challenge?: string;
  code_challenge_method?: string;
  redirect_uri: string;
  client_id: string;
}): string {
  const now = Math.floor(Date.now() / 1000);
  const payload: CodePayload = {
    iat: now,
    exp: now + 600,
    nonce: randomBytes(8).toString('hex'),
    ...input,
  };
  const body = b64url(Buffer.from(JSON.stringify(payload)));
  const sig = b64url(createHmac('sha256', secret()).update(body).digest());
  return `${body}.${sig}`;
}

export function verifyCode(code: string): CodePayload | null {
  const parts = code.split('.');
  if (parts.length !== 2) return null;
  const [body, sig] = parts;
  const expected = b64url(createHmac('sha256', secret()).update(body).digest());
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString()) as CodePayload;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export function verifyPkce(
  payload: CodePayload,
  verifier: string | undefined
): boolean {
  if (!payload.code_challenge) return true;
  if (!verifier) return false;
  if (payload.code_challenge_method === 'S256') {
    const hashed = b64url(createHash('sha256').update(verifier).digest());
    return hashed === payload.code_challenge;
  }
  return verifier === payload.code_challenge;
}

export function isValidBearer(req: Request): boolean {
  const s = process.env.MCP_SHARED_SECRET;
  if (!s) return false;
  const auth = req.headers.get('authorization') ?? '';
  const apiKey = req.headers.get('x-api-key') ?? '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : auth;
  return token === s || apiKey === s;
}
