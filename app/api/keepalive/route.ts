import { getSupabase } from '@/lib/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Hit daily by Vercel Cron (see vercel.json). One cheap SELECT keeps the
// free-tier Supabase database from pausing after ~7 idle days.
export async function GET() {
  const supabase = getSupabase();
  if (!supabase) return Response.json({ ok: false, reason: 'no env' });
  const { error } = await supabase.from('page_content').select('slug').limit(1);
  return Response.json({ ok: !error, at: new Date().toISOString() });
}
