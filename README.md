# The Corner Grill — React / Next.js

Restaurant website rebuilt with **Next.js**, **React**, and **Tailwind CSS**. This branch introduces the React framework setup and ports the original static pages into the App Router.

## Stack

- Next.js (App Router, static export)
- React
- Tailwind CSS
- GitHub Pages deployment via `gh-pages`

## Pages

- `/` — Home
- `/menu/` — Menu with shopping cart
- `/about/` — About
- `/contact/` — Contact form and map

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
```
