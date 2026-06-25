# The Corner Grill — React / Next.js

Restaurant website rebuilt with **Next.js**, **React**, and **Tailwind CSS**. The original static HTML site is preserved in `_legacy/` for reference.

## Stack

- Next.js (App Router, static export)
- React
- Tailwind CSS
- GitHub Pages deployment via `gh-pages`

## Pages

- `/` — Home
- `/menu/` — Menu with shopping cart
- `/about/` — About
- `/contact/` — Book a table / contact form and map

## Setup

```bash
npm install
npm run compress-images
npm run dev
```

Local dev: [http://localhost:3000/](http://localhost:3000/)

## Build & deploy

```bash
npm run build
npm run deploy
```

GitHub Pages URL: `https://iftatbhuiyan.github.io/Restaurant-Website-Project---WebDev/`

## Project structure

```
app/           # Routes and layout
components/    # UI and page components
context/       # Cart state
data/          # Menu data
public/images/ # Food photos
scripts/       # Image compression helper
_legacy/       # Original static HTML/CSS/JS site
```

## Cart (menu page)

- Open `/menu/`
- Click **Add to Cart** on food cards
- Use **Remove** in the cart list
- Confirm **Total** updates
- Use **Clear Cart** to reset
