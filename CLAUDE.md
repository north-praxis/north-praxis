# Chelsea Miller Website — Build Playbook

> For Claude (Code and Cowork sessions working in this folder). This is the
> proven architecture from thecybermouse.com, packaged by Patrick Leber
> (Cyber Mouse) so Chelsea gets the same Claude-managed website experience.
> Follow it closely — the gotchas listed here were all learned the hard way.

## The person you're working with

Chelsea Miller is the site owner. Assume smart-but-nontechnical: give exact
click-paths for dashboard work, complete PowerShell blocks to paste, and one
step at a time. Ask what she wants before building structure (positioning,
pages, tone, colors, existing brand assets). Never expose secret keys back
into the conversation once she's pasted them; write them into `.env.local`
(gitignored) and instruct her to add them to Vercel's env settings herself.

## Architecture (the whole system in one view)

- **Next.js 14, App Router** on **Vercel**. Content-driven pages read from
  Supabase at request/build time with ISR (`export const revalidate = 3600`).
- **Supabase Postgres as the CMS.** One `page_content` table: `slug` (text,
  primary key), `content` (jsonb), `status` ('active'/'draft'), `updated_at`,
  `updated_by` (provenance: 'claude-mcp' / 'admin-ui' / 'manual'). Page
  shapes live as TypeScript types in `lib/types.ts`, not in database DDL.
  A `blog_posts` table if/when she wants a blog: slug, title, date, body,
  published, meta jsonb.
- **Supabase Storage**: one public bucket (`chelsea-images`) for uploads.
- **Vercel Deploy Hook**: an env var named `DEPLOY_HOOK_URL` (see gotchas —
  the name cannot start with `VERCEL_`). POSTing it rebuilds the site.
- **`/admin` editor**: password-gated (env `ADMIN_PASSWORD`, cookie =
  SHA-256 of password + static salt, HttpOnly, path-scoped). Pages: login,
  a dashboard listing rows, a per-page editor (quick fields + raw-JSON
  pane), and an image uploader that pushes to Storage and returns a
  copyable public URL. Every admin save also POSTs the deploy hook.
- **Custom MCP server** in an `mcp/` subfolder of the SAME repo, deployed
  as a SECOND Vercel project with Root Directory = `mcp`. This is what
  connects the site to Cowork so Chelsea can manage everything by chatting.
  Details below — this piece has the most gotchas.
- **Contact form**: server action writes submissions to a Supabase table,
  then POSTs a notification webhook (`ZAPIER_CONTACT_WEBHOOK_URL` if she
  uses Zapier, or wire Resend for direct email — ask her which).

## The MCP server (Cowork connection) — build spec

A single Next.js route `POST /api/mcp` speaking JSON-RPC 2.0 (MCP protocol
version "2024-11-05"), stateless, Node runtime. Tools are thin typed
wrappers over Supabase using the service-role key:

- `list_pages`, `get_page_content(slug)`, `update_page_content(slug,
  content, status?)` (full overwrite, stamps `updated_by='claude-mcp'`),
  `delete_page_content(slug)`
- Blog equivalents if a blog exists
- `upload_image(source_url, path?)` → fetches a URL server-side, uploads to
  the Storage bucket, returns the public URL
- `trigger_deploy()` → POSTs `DEPLOY_HOOK_URL`

Tool contract rules: reads return whole records; updates overwrite whole
objects (get → edit → put back); every write stamps provenance.

**Auth — critical:** Cowork's custom-connector form has NO static-token or
header field. The MCP must implement OAuth 2.1 with Dynamic Client
Registration, single-user auto-approve flavor:

- `GET /.well-known/oauth-authorization-server` — RFC 8414 metadata
  (authorization_endpoint, token_endpoint, registration_endpoint, S256+plain
  PKCE, response_types ["code"], derive origin from x-forwarded-host/proto)
- `GET /.well-known/oauth-protected-resource` — points at the auth server
- `POST /oauth/register` — accept any registration, return a synthetic
  client_id, `token_endpoint_auth_method: "none"` (public client + PKCE)
- `GET /oauth/authorize` — NO consent screen (single user): immediately
  issue an authorization code and 302 back to redirect_uri with state.
  Codes are stateless: `base64url(JSON payload).base64url(HMAC-SHA256
  signature)` signed with `MCP_SHARED_SECRET`, carrying iat/exp (10 min),
  nonce, PKCE challenge + method, redirect_uri, client_id.
- `POST /oauth/token` — verify code signature + expiry + redirect_uri +
  PKCE, then issue `MCP_SHARED_SECRET` itself as the Bearer access token
  (long expiry). `/api/mcp` accepts `Authorization: Bearer <secret>` (also
  tolerate the raw secret and X-API-Key).
- On 401, `/api/mcp` returns `WWW-Authenticate: Bearer resource_metadata=
  "<origin>/.well-known/oauth-protected-resource"` so Cowork discovers the
  flow.

Registering in Cowork: Settings → Connectors → Add custom connector → URL
`https://<mcp-project>.vercel.app/api/mcp`, name it, LEAVE the OAuth
client-id/secret fields blank (DCR handles it). A browser tab flashes for
the auto-approve redirect, then the tools appear in her Claude chats.

Patrick has a working reference implementation of this entire `mcp/` folder
— if Chelsea has been given a copy, use it nearly verbatim (rename, re-env)
instead of writing from scratch.

## Database schema (run in Supabase SQL Editor)

Keep a `supabase/schema.sql` in the repo. Core: `page_content` and a
`contact_submissions` table (or reuse the CRM-lite pattern), plus RLS:
enable on all tables; anon SELECT policy only for `status='active'` /
`published=true` rows; all writes go through the service-role key (MCP,
admin, server actions). `gen_random_uuid()` is built into Postgres 13+ —
do NOT put `CREATE EXTENSION` in the schema file (see gotchas). Seed empty
rows for the initial pages so first deploy renders.

## Env vars (both local `.env.local` and Vercel dashboard)

Website project: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
`SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_STORAGE_BUCKET`, `ADMIN_PASSWORD`,
`DEPLOY_HOOK_URL`, optional `ZAPIER_CONTACT_WEBHOOK_URL`.
MCP project: the Supabase trio + `SUPABASE_STORAGE_BUCKET` +
`MCP_SHARED_SECRET` (generate 64 hex chars) + `DEPLOY_HOOK_URL`.
`.env.local` is gitignored — verify before the first commit.

## Build order (proven)

1. **Discovery**: ask Chelsea about her brand, the site's purpose, pages
   (home / about / services or offerings / contact / blog?), colors, fonts,
   existing assets, and what "done" looks like. Design the content types
   from her answers.
2. **Supabase**: she creates the project in the dashboard (guide her);
   run schema; create the public Storage bucket; collect the URL + keys.
3. **Next.js scaffold**: fresh Tailwind project, her brand tokens, page
   routes reading from Supabase, contact form, custom 404, mobile nav.
4. **GitHub + Vercel**: create repo, push, import to Vercel, env vars,
   first deploy, create the Deploy Hook.
5. **`/admin` editor** + seed real content with her.
6. **MCP**: build/copy `mcp/`, deploy as second Vercel project (Root
   Directory = `mcp`), register in Cowork, verify with a live round-trip
   (get → edit → trigger_deploy → see it on the site).
7. **SEO package**: `app/sitemap.ts` (from Supabase, exclude drafts),
   `app/robots.ts` (block /admin), JSON-LD (Person/Organization + WebSite),
   OG image (1200x630 at `public/og.png`), canonical alternates on every
   page, CMS-driven `generateMetadata`, favicon at `app/icon.png`.
8. **Launch**: domain DNS (A record + CNAME per Vercel's Domains tab;
   never touch MX/TXT records if the domain carries her email), then
   Search Console + Bing Webmaster verification and sitemap submission.
9. **Keepalive**: Supabase free tier pauses after ~7 days idle, which
   makes builds fail while Vercel silently serves the last good deploy.
   Set up a Vercel Cron hitting an API route that runs one cheap SELECT
   daily — machine-independent, set-and-forget.

## Gotchas (every one of these cost real time on the reference build)

- **OneDrive/Dropbox folders break npm** with EPERM file-lock loops. The
  project must live at a plain local path like `C:\Chelsea Miller Website`.
- **Stale `.git\index.lock`** after interrupted git operations:
  `Remove-Item -Force .git\index.lock`. GitHub Desktop reports this as
  "a lock file already exists."
- **PowerShell 5.1 chokes on non-ASCII** in .ps1 files (em dashes in
  comments = bizarre parser errors). Keep any scripts pure ASCII.
- **Supabase SQL Editor read-only toggle**: "cannot execute CREATE TABLE in
  a read-only transaction" means flip the editor out of read-only mode.
- **Vercel rejects env names starting with `VERCEL_`** — hence
  `DEPLOY_HOOK_URL`.
- **Monorepo type-check bleed**: the website's `tsconfig.json` must have
  `"exclude": ["node_modules", "mcp"]` or the site build fails on the MCP's
  dependencies.
- **Env var changes don't auto-redeploy** — trigger a manual redeploy after
  editing them in Vercel.
- **`scrollbar-gutter: stable` on `html`** — prevents the nav shifting
  between short and long pages.
- **Title template double-suffix**: if CMS meta titles already include the
  site name, use `title: { absolute: ... }` in generateMetadata.
- **CMS rich text needs `dangerouslySetInnerHTML`** — plain `{text}`
  renders literal `<strong>` tags.
- **Every page needs exactly one H1** and every image a real alt attribute
  (Bing flags both).
- **Deployment-hash URLs are frozen snapshots**; only the clean production
  URL updates.

## Content & design principles (house style, adapt to Chelsea's brand)

- Content lives in the DB; components render shapes. Use a `sections` array
  with a `variant` field dispatching to React components so new page
  layouts don't require content migrations.
- No em dashes in site copy. No AI-tell vocabulary (leverage, seamless,
  ecosystem, harness, unparalleled). No walls of text.
- One accent color, high contrast, generous whitespace; editorial touches
  (small mono eyebrows, hairline dividers) over decoration.
- Ship small, deploy often, review on the live URL.
- Consider seeding a `voice_rules` table from a chat with Chelsea about her
  voice, and consult it before drafting her copy.

## After the build: the everyday loop

Chelsea opens Cowork and talks to Claude: "swap the hero photo," "add a
testimonials section," "draft a post about X." Claude uses the MCP tools
(content) or asks her to relay code changes through a Claude Code session
(structure). The admin editor covers quick manual edits and image uploads.
That loop — chat, change, live in a minute — is the entire point of this
architecture. Protect it: keep content in the DB, keep the MCP healthy,
keep secrets out of the repo.
