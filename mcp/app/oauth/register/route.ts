import { randomBytes } from 'crypto';

export const runtime = 'nodejs';

// Dynamic Client Registration: accept anything, return a synthetic public
// client. Single-user server; PKCE carries the security.
export async function POST(req: Request) {
  let body: any = {};
  try {
    body = await req.json();
  } catch {
    // empty body is fine
  }
  return Response.json(
    {
      client_id: `np-${randomBytes(12).toString('hex')}`,
      client_id_issued_at: Math.floor(Date.now() / 1000),
      token_endpoint_auth_method: 'none',
      redirect_uris: body.redirect_uris ?? [],
      grant_types: ['authorization_code', 'refresh_token'],
      response_types: ['code'],
      client_name: body.client_name ?? 'mcp-client',
    },
    { status: 201 }
  );
}
