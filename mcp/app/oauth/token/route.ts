import { verifyCode, verifyPkce } from '@/lib/oauth';

export const runtime = 'nodejs';

function err(code: string, description: string, status = 400) {
  return Response.json({ error: code, error_description: description }, { status });
}

export async function POST(req: Request) {
  let params: URLSearchParams;
  const contentType = req.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    const body = await req.json().catch(() => ({}));
    params = new URLSearchParams(body as Record<string, string>);
  } else {
    params = new URLSearchParams(await req.text());
  }

  const grantType = params.get('grant_type');
  const secret = process.env.MCP_SHARED_SECRET;
  if (!secret) return err('server_error', 'Server misconfigured', 500);

  const tokenResponse = {
    access_token: secret,
    token_type: 'bearer',
    expires_in: 31536000,
    refresh_token: secret,
    scope: 'mcp',
  };

  if (grantType === 'refresh_token') {
    if (params.get('refresh_token') !== secret)
      return err('invalid_grant', 'Unknown refresh token');
    return Response.json(tokenResponse);
  }

  if (grantType !== 'authorization_code')
    return err('unsupported_grant_type', 'Use authorization_code or refresh_token');

  const code = params.get('code');
  if (!code) return err('invalid_request', 'Missing code');

  const payload = verifyCode(code);
  if (!payload) return err('invalid_grant', 'Code invalid or expired');

  const redirectUri = params.get('redirect_uri');
  if (redirectUri && redirectUri !== payload.redirect_uri)
    return err('invalid_grant', 'redirect_uri mismatch');

  if (!verifyPkce(payload, params.get('code_verifier') ?? undefined))
    return err('invalid_grant', 'PKCE verification failed');

  return Response.json(tokenResponse);
}
