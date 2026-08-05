'use client';

import { useRef, useState } from 'react';
import { uploadImage } from '@/app/admin/actions';

export default function ImageUploader() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleUpload() {
    const file = inputRef.current?.files?.[0];
    if (!file) {
      setMessage('Choose a file first.');
      return;
    }
    setBusy(true);
    setMessage(null);
    setUrl(null);
    const formData = new FormData();
    formData.set('file', file);
    const res = await uploadImage(formData);
    setMessage(res.message);
    if (res.ok && res.url) setUrl(res.url);
    setBusy(false);
  }

  async function copyUrl() {
    if (!url) return;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-md border border-pale bg-white p-5">
      <p className="text-sm text-slate">
        Upload an image, then copy its URL into page content (for example a split
        section&apos;s imageUrl).
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <input ref={inputRef} type="file" accept="image/*" className="text-sm" />
        <button
          onClick={handleUpload}
          disabled={busy}
          className="rounded bg-night px-5 py-2 text-sm font-medium text-paper hover:bg-deep disabled:opacity-60"
        >
          {busy ? 'Uploading…' : 'Upload'}
        </button>
      </div>
      {message && <p className="mt-3 text-sm text-mid">{message}</p>}
      {url && (
        <div className="mt-2 flex items-center gap-3">
          <code className="break-all rounded bg-pale px-2 py-1 text-xs text-night">{url}</code>
          <button onClick={copyUrl} className="text-sm text-slate underline hover:text-night">
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      )}
    </div>
  );
}
