# Nikhil — Developer Portfolio

A fully responsive, SEO-optimized single-page developer portfolio built with plain HTML, CSS, and JavaScript (no build step required). Ready to deploy on Netlify.

## What's inside
- `index.html` — all sections: Hero, Tech marquee, About, Skills, Work, Experience, Testimonials, Contact
- `style.css` — responsive styles (desktop → tablet → mobile), design tokens at the top of the file
- `script.js` — mobile nav toggle, typed-text hero effect, animated counters, Netlify form submission handling
- `assets/favicon.svg` — site favicon
- `robots.txt`, `sitemap.xml` — basic SEO
- `netlify.toml` — Netlify build & header config
- Contact form is wired for **Netlify Forms** (`data-netlify="true"`) — submissions appear in your Netlify dashboard automatically, no backend needed.

## Deploy to Netlify (2 ways)

### Option A — Drag & drop (fastest)
1. Unzip this folder.
2. Go to https://app.netlify.com/drop
3. Drag the unzipped folder onto the page.
4. Your site is live in ~10 seconds. Grab the URL Netlify gives you (or set a custom subdomain in Site settings → Domain management).

### Option B — Git-based deploy (recommended for future edits)
1. Push this folder to a new GitHub repo.
2. In Netlify: **Add new site → Import an existing project → GitHub** → select the repo.
3. Build command: leave blank. Publish directory: `.`
4. Deploy.

## Before you go live — replace these
- **Placeholder images**: every image currently uses `placehold.co` — swap the `src` in `index.html` for your real photos/screenshots (hero portrait, project thumbnails, about photo).
- **Resume**: add a real `Nikhil-Resume.pdf` file inside `/assets/` (the download button already points to `/assets/Nikhil-Resume.pdf`).
- **Links**: update GitHub/LinkedIn/Twitter URLs and the contact email (currently `hello@nikhildev.com`) in `index.html` (appears in the Hero, Contact, and Footer sections).
- **Domain**: update `nikhilenv.netlify.app` references in the `<meta>` tags, `sitemap.xml`, and `robots.txt` to your actual live domain once you have one.
- **Copy**: project names, experience, and testimonials are placeholders — replace with your real work.

## Enabling the contact form
Netlify Forms works automatically once deployed on Netlify — no extra setup needed. To get email notifications for new submissions: **Site settings → Forms → Form notifications → Add notification → Email notification**.

## Accessibility & performance notes
- Skip-to-content link, visible focus states, and `prefers-reduced-motion` support are built in.
- All images use `loading="lazy"` and explicit width/height to prevent layout shift.
- Semantic landmarks (`header`, `main`, `section`, `footer`) and descriptive `alt` text throughout.
