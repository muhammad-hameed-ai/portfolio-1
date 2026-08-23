# Muhammad Hameed — AI Engineer Portfolio + Admin Panel

A complete, working website with a real, password-protected Admin Panel.
Every save genuinely writes to disk and appears on the live site immediately
— this was tested end-to-end during development, not just built and assumed
to work. See "What Was Actually Tested" below for the specifics.

---

## Your Login Credentials

```
URL:      yoursite.com/admin
Username: admin
Password: Admin@123
```

**Change this password the first time you log in.** Go to the "Password"
section in the Admin Panel sidebar. Anyone who knows these default
credentials could otherwise log in and edit your live site. Instructions
for changing it are below in "First Things To Do."

---

## An Important Technical Fact — Please Read Before Choosing Hosting

Everything built before this point in the project was a simple static
website, which is why Vercel and GitHub Pages were recommended earlier —
those platforms are perfect for a site that never needs to remember
anything between visits.

**The Admin Panel changes this completely.** For "Save" to actually mean
something, the server needs to permanently write your changes to a file
and remember them for every future visitor. Vercel and GitHub Pages
cannot do this — their servers are rebuilt from scratch for every
request, so anything written to disk is thrown away instantly. If this
were deployed there, your saved changes would appear to work for a moment
and then silently vanish.

**This is not a flaw in the code — it's a fundamental difference in what
kind of hosting this needs now.** The fix is simple: use a host that runs
a real, persistent Node.js server. Two beginner-friendly options that
work perfectly for this:

- **Railway** (railway.app) — recommended, simplest setup
- **Render** (render.com) — also excellent, similarly simple

Both have free tiers and both are explained in plain language below.

---

## Full-Site Consistency Review — What Was Fixed

After all six pages and the Admin Panel were built, a dedicated pass
checked every page against every other page, at mobile, tablet, and
desktop widths, plus the Admin Panel itself. Three real issues were found
and fixed — not cosmetic nitpicks, but things that would have actually
looked broken or behaved incorrectly:

1. **The Portfolio page didn't exist.** Every nav link and "View Full
   Portfolio" button had pointed to `/portfolio` since early in the build,
   but the page itself was never created — visiting it would 404. It's
   now a complete project grid matching the site's design system, built
   and verified at all three breakpoints.

2. **Theme-breaking hardcoded colors.** Several buttons and the Contact
   form's dropdowns used a fixed hex color instead of a theme variable,
   so switching to Midnight Blue, Slate Purple, or Emerald Dark would
   have left those elements with a mismatched orange tint. Fixed with a
   proper theme-aware variable, verified by switching to Emerald Dark and
   confirming the button rendered a clean, matching green gradient.

3. **The Admin Panel was unusable on a phone.** The sidebar disappeared
   entirely below tablet width with no replacement — meaning once you
   left the dashboard on mobile, there was no way to reach another
   section or even log out. Fixed with a proper mobile menu (hamburger
   icon, full nav, logout, "view live site" link), verified by actually
   tapping Dashboard → Services → Log Out using only the new mobile menu.

---

## How To Deploy This — Step By Step (Non-Technical)

### Step 1: Put your project on GitHub
1. Go to github.com and create a free account if you don't have one
2. Create a new repository (click the "+" in the top right → "New repository")
3. Follow GitHub's instructions to upload this entire folder — the
   easiest way is using GitHub Desktop (a free app with a simple drag-and-drop
   interface): download it from desktop.github.com, sign in, and it will
   walk you through uploading this folder as a new repository

### Step 2: Deploy to Railway
1. Go to railway.app and sign up (you can sign up directly with your GitHub account)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select the repository you just created
4. Railway will detect it's a Next.js project automatically and start building it
5. Once it finishes (usually 2-3 minutes), click "Settings" → "Networking" →
   "Generate Domain" to get your live website address

### Step 3: Set your session secret (important security step)
1. In Railway, click on your project → "Variables"
2. Add a new variable named `SESSION_SECRET`
3. For the value, use a long random string — the easiest way to generate
   one is to ask any AI assistant "generate a random 32-character string
   for me" and paste whatever it gives you
4. Railway will automatically restart your site with this new setting

### Step 4: Connect your own domain name (optional)
If you own a domain (like muhammadhameed.com), Railway's "Networking"
settings let you connect it with a simple copy-paste of two DNS records —
Railway's own dashboard walks you through this with clear instructions
when you click "Custom Domain."

**That's it. Every time you push a change to GitHub, Railway automatically
rebuilds and redeploys your site within a couple of minutes.**

---

## First Things To Do After Your Site Is Live

### 1. Change your password immediately
Log in at `yoursite.com/admin` with the default credentials above, click
"Password" in the sidebar, enter your current password (`Admin@123`), and
set a new username and password. This takes 30 seconds and is the single
most important thing to do before sharing your site publicly.

### 2. Double-check your Session Secret is set
If you skipped Step 3 above, admin logins will still work, but they use
a default fallback value that is not private. Set the real `SESSION_SECRET`
in Railway's Variables panel as described above.

---

## What You Can Do From the Admin Panel

- **Page Text** — edit your name, title, tagline, hero stats, About page
  story and timeline, skill levels, and Contact page intro
- **Services** — add, edit, or remove services and set their prices
- **Awards & Achievements** — add, edit, or remove certifications and awards
- **Portfolio Projects** — add, edit, or remove projects, including
  uploading real thumbnail images
- **Contact & Socials** — update your email, WhatsApp note, LinkedIn,
  GitHub, and your profile photo
- **Theme** — instantly switch the whole site between 4 complete color
  themes: Charcoal Orange, Midnight Blue, Slate Purple, and Emerald Dark
- **Password** — change your admin username and password at any time

Every one of these saves to a real file on the server and takes effect on
the very next page load — no rebuild, no redeploy, no waiting.

---

## What Was Actually Tested (Not Just Built)

Before this was packaged, each of these was verified with real, automated
browser testing — not just visual inspection:

1. **Unauthenticated access to `/admin` is blocked** — confirmed it
   redirects to the login page at the network level (a 307 redirect),
   before any admin page content is ever sent to the browser
2. **Wrong password is rejected** — confirmed the login form correctly
   refuses an incorrect password and stays on the login page
3. **Correct default credentials work** — confirmed `admin` / `Admin@123`
   successfully reaches the dashboard
4. **An edit made in the Admin Panel appears on the live public page** —
   changed the hero name in Page Text, saved, then loaded the actual
   public homepage in a fresh browser context and confirmed the change
   was there
5. **Image upload genuinely writes a file and it renders correctly** —
   uploaded a real image through the Portfolio manager, confirmed the
   file appeared on disk, confirmed it rendered in the admin list AND
   on the live public Featured Work section
6. **Theme switching works instantly, site-wide** — switched from
   Charcoal Orange to Slate Purple via the Theme page, then loaded the
   public homepage fresh and confirmed every color had changed, with
   no rebuild in between
7. **Changing the password actually works** — changed the password,
   confirmed logging in with the OLD password now fails, confirmed
   logging in with the NEW password succeeds, then reverted to the
   documented default credentials before packaging this zip

A real bug was also caught and fixed during this process: the first
build marked every public page as "static," which would have meant
Admin Panel edits never appeared on the live site without a full
rebuild. This was caught by reading the build output carefully, fixed
by forcing every page to render dynamically on each request, and
reconfirmed with a second build showing every route correctly marked
as dynamic.

---

## Run Locally First (Recommended)

Before deploying, see it running on your own computer:

```
npm install
npm run dev
```

Open `http://localhost:3000` for the live site, and
`http://localhost:3000/admin` for the Admin Panel.

---

## Project Structure

```
app/
  page.tsx, about/, services/, awards/, portfolio/, contact/  — public pages (all read live data)
  admin/                                            — the Admin Panel (login, dashboard, every section)
  api/admin/                                        — the real backend: auth, CRUD, image upload
  layout.tsx, globals.css                           — shared layout, fonts, and the 4 theme definitions
components/                                          — every UI piece, public-facing and admin-facing
hooks/                                               — scroll reveal, count-up, skill-fill animations
lib/
  store.ts    — the real data read/write layer (JSON files on disk)
  auth.ts     — real session handling and password hashing
data/         — your actual content, as JSON files (this is your real "database")
public/uploads/ — where uploaded images actually live
proxy.ts      — protects every /admin/* route at the network level
```

## Updating Content Without the Admin Panel (Advanced)

Everything the Admin Panel edits lives in the `data/` folder as plain JSON
files. You can open and edit these directly with a text editor if you're
ever comfortable doing so, though the Admin Panel is the intended way to
manage everything day to day.
