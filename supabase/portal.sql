-- Client portal table. Service-role access only (no anon policies):
-- access codes are checked server-side and never exposed to browsers.

create table if not exists portal_clients (
  slug text primary key,
  name text not null,
  access_code text not null unique,
  content jsonb not null default '{}'::jsonb,
  status text not null default 'active' check (status in ('active', 'archived')),
  updated_at timestamptz not null default now(),
  updated_by text not null default 'manual'
);

alter table portal_clients enable row level security;

-- Demo client so the portal can be tested right away.
insert into portal_clients (slug, name, access_code, content, updated_by) values
(
  'demo',
  'Demo Organization',
  'NORTHSTAR',
  '{
    "welcome": "Welcome to your North Praxis workspace. Everything about our engagement lives here: where we are, what comes next, and the documents we are working from.",
    "milestones": [
      { "title": "Discovery and listening sessions", "date": "Completed", "state": "done", "note": "Board and staff interviews, document review." },
      { "title": "Strategy retreat", "date": "In progress", "state": "now", "note": "Synthesizing themes into draft strategic priorities." },
      { "title": "Draft plan review", "date": "Up next", "state": "next" },
      { "title": "Final plan and systems handoff", "date": "Ahead", "state": "next" }
    ],
    "updates": [
      { "date": "This week", "body": "Interview synthesis is complete. Three clear themes emerged; we will walk through them together at the retreat." }
    ],
    "documents": [
      { "title": "Engagement letter", "url": "https://example.com", "note": "Signed copy" }
    ]
  }'::jsonb,
  'manual'
)
on conflict (slug) do nothing;
