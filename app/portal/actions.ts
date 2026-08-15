'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getServiceSupabase } from '@/lib/supabase';

const PORTAL_COOKIE = 'np_portal';

export async function enterPortal(formData: FormData) {
  const code = String(formData.get('code') ?? '').trim();
  if (!code) redirect('/portal?error=1');

  const supabase = getServiceSupabase();
  if (!supabase) redirect('/portal?error=1');

  const { data } = await supabase
    .from('portal_clients')
    .select('slug')
    .eq('access_code', code)
    .eq('status', 'active')
    .single();
  if (!data) redirect('/portal?error=1');

  cookies().set(PORTAL_COOKIE, code, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/portal',
    maxAge: 60 * 60 * 24 * 90,
  });
  redirect('/portal');
}

export async function leavePortal() {
  cookies().delete({ name: PORTAL_COOKIE, path: '/portal' });
  redirect('/portal');
}
