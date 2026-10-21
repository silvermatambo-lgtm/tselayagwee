# Tsela Yagwe Network

Official WebDevPro source repository for https://tsela-yagwe-network.vercel.app

## Project

Static HTML/CSS/JavaScript frontend with Supabase Auth/Postgres backend and a WhatsApp enquiry assistant. The marketplace landing page includes investor and franchise courses, farm produce, and food-market categories.

## Deployment

Hosting: Vercel. Production URL: https://tsela-yagwe-network.vercel.app

- `index.html`: frontend and public marketplace navigation.
- `app.js`: existing application logic, registration, dashboards and admin panels.
- `styles.css`: global styles.
- `config.js`: public Supabase URL and browser publishable key with frontend integration. **Never place a Supabase service-role key here.**
- `vercel.json`: SPA routes configuration.
- `manifest.webmanifest`, `icon.svg`, `sw.js`: PWA configuration.
- `offline.html`: offline fallback.

## Important

The Supabase database, Auth users and row-level security policies are managed in the connected Supabase project, not by static files. Never commit SMTP passwords, payment keys, service-role keys or sensitive user data.

Financial transactions remain disabled until payment gateway and regulatory configuration and testing are complete.

### Development workflow

GitHub `main` is the master source. Connect this repository under **Vercel project → Settings → Git** to enable automatic deployments for each push. Until that Git linkage is verified, changes to GitHub do not automatically update the production Vercel site.
