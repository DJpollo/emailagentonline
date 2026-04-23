# Auto-Review Agent Web App

This folder contains the Vercel-deployable frontend for the Auto-Review Agent project.

It is a Vite + React app that connects to the Supabase tables defined by the migrations in the repository root.

## Local Development

1. Install dependencies:

```bash
npm install
```

Use Node.js 20.19+ locally so Vite, Tailwind, and Supabase dependencies match the expected runtime.

2. Create a `.env.local` file in `web/` with:

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Start the app:

```bash
npm run dev
```

## Vercel Deployment

Import this GitHub repository into Vercel and set the project's Root Directory to `web`.

Use these settings:

- Build Command: `npm run build`
- Output Directory: `dist`

Add these environment variables in Vercel:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
