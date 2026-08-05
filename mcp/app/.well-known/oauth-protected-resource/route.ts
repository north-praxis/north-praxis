import { getOrigin } from '@/lib/origin';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const origin = getOrigin(req);
  return Response.json({
    resource: `${origin}/api/mcp`,
    authorization_servers: [origin],
    bearer_methods_supported: ['header'],
  });
}
