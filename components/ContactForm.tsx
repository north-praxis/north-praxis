'use client';

import { useState } from 'react';
import { submitContact } from '@/app/contact/actions';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const formData = new FormData(e.currentTarget);
    const result = await submitContact(formData);
    setStatus(result.ok ? 'sent' : 'error');
  }

  if (status === 'sent') {
    return (
      <div className="rounded-md border border-mist bg-pale p-6">
        <p className="font-medium text-night">Message sent</p>
        <p className="mt-1 text-sm text-mid">
          Thanks for reaching out. You will hear back within a few business days.
        </p>
      </div>
    );
  }

  const field =
    'w-full rounded border border-mist bg-white px-4 py-3 text-night placeholder:text-mid/70 focus:border-slate focus:outline-none';

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm text-slate">
            Name
          </label>
          <input id="name" name="name" required className={field} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm text-slate">
            Email
          </label>
          <input id="email" name="email" type="email" required className={field} />
        </div>
      </div>
      <div>
        <label htmlFor="organization" className="mb-1.5 block text-sm text-slate">
          Organization <span className="text-mid">(optional)</span>
        </label>
        <input id="organization" name="organization" className={field} />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm text-slate">
          What are you working toward?
        </label>
        <textarea id="message" name="message" rows={5} required className={field} />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="rounded bg-night px-6 py-3 text-sm font-medium text-paper transition hover:bg-deep disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
      {status === 'error' && (
        <p className="text-sm text-red-700">
          Something went wrong sending your message. Email us directly at
          chelsea@northpraxis.com.
        </p>
      )}
    </form>
  );
}
