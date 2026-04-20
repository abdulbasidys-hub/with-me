# $ME Landing Page

## Setup

1. `npm install`
2. Add your Gemini key to `.env`: `VITE_APP_GEMINI=your_key_here`
3. Add to `/public`:
   - `wall.jpg` — background image
   - `template.jpg` — your $ME mascot artwork (used for face swap)
4. Update CA, Twitter, Community links at the top of `src/App.jsx`

## Run
```
npm run dev
```

## Deploy to Vercel
Push to GitHub, import in Vercel, add `VITE_APP_GEMINI` as environment variable in Vercel dashboard.
