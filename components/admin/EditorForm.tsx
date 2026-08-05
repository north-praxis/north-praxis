'use client';

import { useMemo, useState } from 'react';
import { savePage } from '@/app/admin/actions';

interface Props {
  slug: string;
  initialContent: any;
  initialStatus: 'active' | 'draft';
}

export default function EditorForm({ slug, initialContent, initialStatus }: Props) {
  const [json, setJson] = useState(() => JSON.stringify(initialContent, null, 2));
  const [status, setStatus] = useState<'active' | 'draft'>(initialStatus);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  // Quick fields edit the same JSON so the two panes never diverge.
  const parsed = useMemo(() => {
    try {
      return JSON.parse(json);
    } catch {
      return null;
    }
  }, [json]);

  function setField(key: 'title' | 'metaDescription', value: string) {
    if (!parsed) return;
    setJson(JSON.stringify({ ...parsed, [key]: value }, null, 2));
  }

  async function handleSave() {
    setBusy(true);
    setResult(null);
    const res = await savePage(slug, json, status);
    setResult(res);
    setBusy(false);
  }

  const field =
    'w-full rounded border border-mist bg-white px-4 py-2.5 text-night focus:border-slate focus:outline-none';

  return (
    <div className="space-y-6">
      {parsed ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-slate">Browser title</label>
            <input
              className={field}
              value={parsed.title ?? ''}
              onChange={(e) => setField('title', e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-slate">Meta description</label>
            <input
              className={field}
              value={parsed.metaDescription ?? ''}
              onChange={(e) => setField('metaDescription', e.target.value)}
            />
          </div>
        </div>
      ) : (
        <p className="rounded border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          The JSON below has a syntax error. Quick fields are disabled until it parses.
        </p>
      )}

      <div>
        <label className="mb-1 block text-sm text-slate">
          Full page content (JSON). Sections render top to bottom.
        </label>
        <textarea
          value={json}
          onChange={(e) => setJson(e.target.value)}
          rows={24}
          spellCheck={false}
          className="w-full rounded border border-mist bg-white p-4 font-mono text-xs leading-relaxed text-night focus:border-slate focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-4">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as 'active' | 'draft')}
          className="rounded border border-mist bg-white px-3 py-2.5 text-sm"
        >
          <option value="active">Active (visible on site)</option>
          <option value="draft">Draft (hidden)</option>
        </select>
        <button
          onClick={handleSave}
          disabled={busy || !parsed}
          className="rounded bg-night px-6 py-2.5 text-sm font-medium text-paper hover:bg-deep disabled:opacity-60"
        >
          {busy ? 'Saving…' : 'Save and publish'}
        </button>
      </div>

      {result && (
        <p
          className={`rounded border px-4 py-3 text-sm ${
            result.ok
              ? 'border-mist bg-pale text-night'
              : 'border-red-200 bg-red-50 text-red-800'
          }`}
        >
          {result.message}
        </p>
      )}
    </div>
  );
}
