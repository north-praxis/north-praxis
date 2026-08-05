'use server';

import { getServiceSupabase } from '@/lib/supabase';

export async function submitContact(formData: FormData): Promise<{ ok: boolean }> {
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const organization = String(formData.get('organization') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();

  if (!name || !email || !message) return { ok: false };

  const supabase = getServiceSupabase();
  if (!supabase) return { ok: false };

  const { error } = await supabase.from('contact_submissions').insert({
    name,
    email,
    organization: organization || null,
    message,
  });
  if (error) return { ok: false };

  // Optional notification webhook (Zapier or similar). Failure here does
  // not fail the submission; it is already stored in the database.
  const webhook = process.env.ZAPIER_CONTACT_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, organization, message }),
      });
    } catch {
      // ignore
    }
  }

  return { ok: true };
}
