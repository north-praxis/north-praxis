import { createClient } from '@supabase/supabase-js';

function db() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase env vars missing');
  return createClient(url, key, { auth: { persistSession: false } });
}

const BUCKET = () => process.env.SUPABASE_STORAGE_BUCKET ?? 'chelsea-images';

export const TOOL_DEFS = [
  {
    name: 'list_pages',
    description:
      'List all pages of the North Praxis website with slug, status, and last update info.',
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'get_page_content',
    description:
      'Get the full content record for one page by slug (home, about, services, contact). Returns the whole record; to edit, modify this object and send it back via update_page_content.',
    inputSchema: {
      type: 'object',
      properties: { slug: { type: 'string', description: 'Page slug' } },
      required: ['slug'],
    },
  },
  {
    name: 'update_page_content',
    description:
      'Overwrite a page\'s full content object (get, edit, put back — this replaces the whole thing). Creates the page if the slug is new. Remember to call trigger_deploy afterward to publish.',
    inputSchema: {
      type: 'object',
      properties: {
        slug: { type: 'string' },
        content: {
          type: 'object',
          description:
            'Full page content: { title, metaDescription, sections: [...] }',
        },
        status: { type: 'string', enum: ['active', 'draft'] },
      },
      required: ['slug', 'content'],
    },
  },
  {
    name: 'delete_page_content',
    description: 'Delete a page row entirely. Use with care.',
    inputSchema: {
      type: 'object',
      properties: { slug: { type: 'string' } },
      required: ['slug'],
    },
  },
  {
    name: 'list_contact_submissions',
    description: 'List recent contact form submissions (newest first, max 50).',
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'upload_image',
    description:
      'Fetch an image from a URL server-side and upload it to the public storage bucket. Returns the public URL to use in page content.',
    inputSchema: {
      type: 'object',
      properties: {
        source_url: { type: 'string', description: 'URL of the image to fetch' },
        path: {
          type: 'string',
          description: 'Optional storage path/filename, e.g. hero/sky.jpg',
        },
      },
      required: ['source_url'],
    },
  },
  {
    name: 'trigger_deploy',
    description:
      'Trigger a Vercel rebuild so saved content changes go live (takes about a minute).',
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
];

export async function callTool(name: string, args: any): Promise<unknown> {
  switch (name) {
    case 'list_pages': {
      const { data, error } = await db()
        .from('page_content')
        .select('slug, status, updated_at, updated_by')
        .order('slug');
      if (error) throw new Error(error.message);
      return data;
    }
    case 'get_page_content': {
      const { data, error } = await db()
        .from('page_content')
        .select('*')
        .eq('slug', args.slug)
        .single();
      if (error) throw new Error(error.message);
      return data;
    }
    case 'update_page_content': {
      const { error } = await db()
        .from('page_content')
        .upsert({
          slug: args.slug,
          content: args.content,
          status: args.status ?? 'active',
          updated_at: new Date().toISOString(),
          updated_by: 'claude-mcp',
        });
      if (error) throw new Error(error.message);
      return { ok: true, slug: args.slug };
    }
    case 'delete_page_content': {
      const { error } = await db().from('page_content').delete().eq('slug', args.slug);
      if (error) throw new Error(error.message);
      return { ok: true, deleted: args.slug };
    }
    case 'list_contact_submissions': {
      const { data, error } = await db()
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      if (error) throw new Error(error.message);
      return data;
    }
    case 'upload_image': {
      const res = await fetch(args.source_url);
      if (!res.ok) throw new Error(`Could not fetch image: HTTP ${res.status}`);
      const contentType = res.headers.get('content-type') ?? 'application/octet-stream';
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length > 15 * 1024 * 1024) throw new Error('Image is over 15 MB');
      const ext = contentType.split('/')[1]?.split(';')[0] ?? 'bin';
      const path = args.path ?? `uploads/${Date.now()}.${ext}`;
      const client = db();
      const { error } = await client.storage
        .from(BUCKET())
        .upload(path, buf, { contentType, upsert: true });
      if (error) throw new Error(error.message);
      const { data } = client.storage.from(BUCKET()).getPublicUrl(path);
      return { ok: true, url: data.publicUrl };
    }
    case 'trigger_deploy': {
      const url = process.env.DEPLOY_HOOK_URL;
      if (!url) throw new Error('DEPLOY_HOOK_URL is not set');
      const res = await fetch(url, { method: 'POST' });
      if (!res.ok) throw new Error(`Deploy hook returned HTTP ${res.status}`);
      return { ok: true, note: 'Rebuild started, live in about a minute.' };
    }
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}
