# Account Setup — do this before anything else

Work top to bottom. Everything here is one-time. Use the SAME email address
for all of it (whatever address you want your website life attached to), and
save every password in a password manager as you go.

## 1. GitHub (stores your website's code)

1. Go to https://github.com/signup → create an account.
2. Pick a username you're happy to keep (e.g. `chelseamiller` or similar).
3. Verify your email. Done — Claude will create the actual repository later.

## 2. Vercel (hosts your website)

1. Go to https://vercel.com/signup.
2. Choose **"Continue with GitHub"** — this matters. It links the two
   accounts so deploys happen automatically.
3. Free "Hobby" plan is correct.

## 3. Supabase (your content database)

1. Go to https://supabase.com → Sign up (GitHub sign-in is fine here too).
2. Just create the account — Claude will walk you through creating the
   actual project when the build starts.
3. Free plan is correct. One quirk to know for later: free-tier databases
   pause after about a week of no traffic. Claude will set up a "keepalive"
   so this never bites you.

## 4. Claude (both halves)

You'll use Claude two ways, same subscription:

- **Cowork / the Claude desktop app** — your everyday way of managing the
  site by chatting. Install from https://claude.ai/download if you haven't.
- **Claude Code** — the terminal version, used for the build and for deeper
  code work. Installed in step 6 below.

A paid Claude plan (Pro or higher) is required for Claude Code and Cowork.

## 5. Install the tools (Windows)

Install in this order, accepting defaults unless noted:

1. **Node.js LTS** — https://nodejs.org → download the LTS installer → run it.
   Verify: open PowerShell, type `node --version` → should print a version.
2. **Git** — https://git-scm.com/download/win → run installer, defaults fine.
   Verify: `git --version` in PowerShell.
3. **GitHub Desktop** (optional but recommended for beginners) —
   https://desktop.github.com → sign in with your GitHub account. This gives
   you a friendly window for pushing code if the command line ever feels
   unfriendly.

## 6. Install Claude Code

In PowerShell:

```powershell
npm install -g @anthropic-ai/claude-code
```

Then type `claude` and follow the sign-in prompts (it opens a browser to
authenticate with your Claude account).

## 7. Create the project folder (location matters!)

```powershell
mkdir "C:\Chelsea Miller Website"
```

**Directly on C:. Not OneDrive. Not Dropbox. Not the Desktop** (on most
Windows machines the Desktop is secretly inside OneDrive). Cloud-sync
tools lock files while the build tools are working and cause maddening
failures. The website's code lives here; it's backed up by GitHub, so it
doesn't need OneDrive.

Then copy the `CLAUDE.md` file from this kit into that folder.

## 8. Domain (can wait)

If you already own a domain (e.g. chelseamiller.com), nothing to do yet —
Claude handles the connection near the end and will give you exact
instructions for your registrar. If you don't own one yet, buy it wherever
you like (Namecheap, GoDaddy, Google/Squarespace domains all fine) whenever
you're ready; the site works on a free `.vercel.app` address until then.

---

✅ When all of the above is done, open PowerShell and run:

```powershell
cd "C:\Chelsea Miller Website"
claude
```

…then paste in the message from `FIRST-PROMPT.md`. From here on, Claude
drives and you click when asked.
