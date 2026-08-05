'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getServiceSupabase } from '@/lib/supabase';
import { ADMIN_COOKIE, adminToken, isAuthed, triggerDeploy } from '@/lib/admin';

export async function login(formData: FormData) {
  const password = String(formData.get('password') ?? '');
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    redirect('/admin?error=1');
  }
  cookies().set(ADMIN_COOKIE, adminToken(), {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/admin',
    maxAge: 60 * 60 * 24 * 30,
  });
  redirect('/admin');
}

export async function logout() {
  cookies().delete({ name: ADMIN_COOKIE, path: '/admin' });
  redirect('/admin');
}

export async function savePage(
  slug: string,
  contentJson: string,
  status: 'active' | 'draft'
): Promise<{ ok: boolean; message: string }> {
  if (!isAuthed()) return { ok: false, message: 'Not signed in.' };

  let content: unknown;
  try {
    content = JSON.parse(contentJson);
  } catch {
    return { ok: false, message: 'Invalid JSON. Fix the syntax and try again.' };
  }

  const supabase = getServiceSupabase();
  if (!supabase) return { ok: false, message: 'Server is missing database keys.' };

  const { error } = await supabase.from('page_content').upsert({
    slug,
    content,
    status,
    updated_at: new Date().toISOString(),
    updated_by: 'admin-ui',
  });
  if (error) return { ok: false, message: `Save failed: ${error.message}` };

  const deployed = await triggerDeploy();
  return {
    ok: true,
    message: deployed
      ? 'Saved. Site is rebuilding, live in about a minute.'
      : 'Saved to the database, but the rebuild trigger failed. Changes appear within an hour, or redeploy manually in Vercel.',
  };
}

export async function uploadImage(
  formData: FormData
): Promise<{ ok: boolean; url?: string; message: string }> {
  if (!isAuthed()) return { ok: false, message: 'Not signed in.' };

  const file = formData.get('file') as File | null;
  if (!file || file.size === 0) return { ok: false, message: 'Choose a file first.' };
  if (file.size > 8 * 1024 * 1024)
    return { ok: false, message: 'File is over 8 MB. Resize it and try again.' };

  const supabase = getServiceSupabase();
  if (!supabase) return { ok: false, message: 'Server is missing database keys.' };

  const bucket = process.env.SUPABASE_STORAGE_BUCKET ?? 'chelsea-images';
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.-]+/g, '-');
  const path = `uploads/${Date.now()}-${safeName}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) return { ok: false, message: `Upload failed: ${error.message}` };

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return { ok: true, url: data.publicUrl, message: 'Uploaded.' };
}
