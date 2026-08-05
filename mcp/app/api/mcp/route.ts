import { getOrigin } from '@/lib/origin';
import { isValidBearer } from '@/lib/oauth';
import { TOOL_DEFS, callTool } from '@/lib/tools';

export const runtime = 'nodejs';
export const maxDuration = 60;

const PROTOCOL_VERSION = '2024-11-05';

function unauthorized(req: Request) {
  const origin = getOrigin(req);
  return new Response(JSON.stringify({ error: 'unauthorized' }), {
    status: 401,
    headers: {
      'Content-Type': 'application/json',
      'WWW-Authenticate': `Bearer resource_metadata="${origin}/.well-known/oauth-protected-resource"`,
    },
  });
}

function rpcResult(id: unknown, result: unknown) {
  return Response.json({ jsonrpc: '2.0', id, result });
}

function rpcError(id: unknown, code: number, message: string) {
  return Response.json({ jsonrpc: '2.0', id, error: { code, message } });
}

export async function POST(req: Request) {
  if (!isValidBearer(req)) return unauthorized(req);

  let body: any;
  try {
    body = await req.json();
  } catch {
    return rpcError(null, -32700, 'Parse error');
  }

  const { id, method, params } = body ?? {};

  switch (method) {
    case 'initialize':
      return rpcResult(id, {
        protocolVersion: PROTOCOL_VERSION,
        capabilities: { tools: {} },
        serverInfo: { name: 'north-praxis-site', version: '1.0.0' },
      });
    case 'notifications/initialized':
    case 'notifications/cancelled':
      return new Response(null, { status: 202 });
    case 'ping':
      return rpcResult(id, {});
    case 'tools/list':
      return rpcResult(id, { tools: TOOL_DEFS });
    case 'tools/call': {
      const name = params?.name;
      const args = params?.arguments ?? {};
      try {
        const result = await callTool(name, args);
        return rpcResult(id, {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
          isError: false,
        });
      } catch (e: any) {
        return rpcResult(id, {
          content: [{ type: 'text', text: `Error: ${e?.message ?? 'unknown'}` }],
          isError: true,
        });
      }
    }
    default:
      return rpcError(id, -32601, `Method not found: ${method}`);
  }
}

export async function GET(req: Request) {
  if (!isValidBearer(req)) return unauthorized(req);
  return new Response('north-praxis-mcp: POST JSON-RPC 2.0 here', { status: 405 });
}
