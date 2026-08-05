# Chelsea Miller Website — Setup Kit

> From Patrick @ Cyber Mouse. This folder contains everything needed to stand
> up your own website on the same architecture as thecybermouse.com — with
> Claude as your webmaster, exactly the way Patrick runs his own site.

## What you're building

A modern website where **Claude manages nearly everything** — code, content,
design changes, and deploys — while you keep ownership of every account.

```
  Claude (Cowork chat) ──"change my headline"──►  Your MCP server ──► Supabase
        │                                              │           (content DB)
        │                                              └──trigger──► Vercel rebuild
        │
  Claude Code (terminal) ──code changes──► GitHub repo ──auto-deploy──► Vercel (your site)
                                                                          │
                                     Supabase ◄──────────reads content───┘
```

Day to day, managing the site feels like this: you open Claude, type
"update my about page to mention the new offering," and it's live about a
minute later. No CMS dashboard, no calling a developer.

- **GitHub** stores the code. Everything versioned, nothing ever lost.
- **Vercel** hosts the site. Every code push deploys automatically in ~60s.
- **Supabase** holds your page content as data — content edits need no
  deploy, and you also get a password-protected `/admin` page for quick
  manual edits and image uploads.
- **Your MCP server** (a small app Claude builds for you) is what lets
  Claude edit your site from a normal chat conversation in Cowork.
- **Claude Code** (terminal Claude) does the initial build and any deeper
  code work later.

Running cost at small scale: **$0/month** on free tiers, plus your domain
(~$20/yr) and your Claude subscription.

## The files in this folder

| File | What it's for |
| --- | --- |
| `ACCOUNT-SETUP.md` | Do this FIRST. Creating the accounts + installing the tools. ~1 hour, one time. |
| `CLAUDE.md` | The architecture playbook. Copy it into your project folder — Claude reads it automatically and knows exactly how to build. Don't edit it; just place it. |
| `FIRST-PROMPT.md` | The exact first message to paste into Claude Code to kick off the build. |

## The sequence

1. Work through `ACCOUNT-SETUP.md` (accounts + installs).
2. Create your project folder at **`C:\Chelsea Miller Website`** — directly
   on the C: drive, **NOT in OneDrive, Dropbox, or on the Desktop**.
   (Cloud-sync folders lock files and break the build tools. This bites
   everyone exactly once.)
3. Copy `CLAUDE.md` from this kit into that project folder.
4. Open a terminal in the project folder and start Claude Code (`claude`).
5. Paste the message from `FIRST-PROMPT.md`. Claude builds in phases and
   tells you exactly when it needs a click or a pasted key from you.
6. The final phase connects your site to Cowork — after that, everyday
   management is just chatting with Claude.

## What Claude does vs. what only you can do

**Claude does:** all code, all content, database schema, page design, SEO,
bug fixes, and precise instructions for your part.

**Only you can do** (Claude tells you when): create accounts, click inside
the GitHub/Vercel/Supabase dashboards, paste secret keys when asked, and
approve things on your screen.

**One safety habit:** secret keys live in a file called `.env.local` and in
Vercel's settings — never in the GitHub repo, and never in chats you share.
The setup enforces this; keep the habit.

## If you get stuck

Paste the exact error message (or a screenshot) to Claude — that's genuinely
the fastest fix. For anything confusing or account-related:
patrick@thecybermouse.com.
