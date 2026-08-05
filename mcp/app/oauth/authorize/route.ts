import { makeCode } from '@/lib/oauth';

export const runtime = 'nodejs';

// Single-user auto-approve: no consent screen. Immediately issue a code
// and redirect back.
export async function GET(req: Request) {
  const url = new URL(req.url);
  const p = url.searchParams;
  const redirectUri = p.get('redirect_uri');
  const clientId = p.get('client_id') ?? 'unknown';
  const state = p.get('state');

  if (!redirectUri) {
    return new Response('Missing redirect_uri', { status: 400 });
  }

  const code = makeCode({
    code_challenge: p.get('code_challenge') ?? undefined,
    code_challenge_method: p.get('code_challenge_method') ?? undefined,
    redirect_uri: redirectUri,
    client_id: clientId,
  });

  const target = new URL(redirectUri);
  target.searchParams.set('code', code);
  if (state) target.searchParams.set('state', state);
  return Response.redirect(target.toString(), 302);
}
