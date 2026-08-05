import { createHash } from 'crypto';
import { cookies } from 'next/headers';

const SALT = 'north-praxis-admin-v1';
export const ADMIN_COOKIE = 'np_admin';

export function adminToken(): string {
  return createHash('sha256')
    .update((process.env.ADMIN_PASSWORD ?? '') + SALT)
    .digest('hex');
}

export function isAuthed(): boolean {
  if (!process.env.ADMIN_PASSWORD) return false;
  const cookie = cookies().get(ADMIN_COOKIE)?.value;
  return cookie === adminToken();
}

export async function triggerDeploy(): Promise<boolean> {
  const url = process.env.DEPLOY_HOOK_URL;
  if (!url) return false;
  try {
    const res = await fetch(url, { method: 'POST' });
    return res.ok;
  } catch {
    return false;
  }
}
