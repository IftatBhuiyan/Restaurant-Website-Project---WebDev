# The Corner Grill — React / Next.js + Node.js API

Restaurant website rebuilt with **Next.js**, **React**, **Tailwind CSS**, and a **Node.js / Express / MongoDB** backend for menu, cart, and order persistence.

The original static HTML site is preserved in `_legacy/` for reference.

## Stack

- **Frontend:** Next.js (App Router, static export), React, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Deploy:** GitHub Pages for the frontend (`gh-pages` branch)

## Pages

- `/` — Home
- `/menu/` — Menu with shopping cart (loads from API)
- `/about/` — About
- `/contact/` — Book a table / contact form and map

## Setup

### 1. Frontend

```bash
npm install
cp .env.local.example .env.local
npm run compress-images
```

### 2. Backend

Requires a running MongoDB instance (local or Atlas).

```bash
cd server
npm install
cp .env.example .env
npm run seed
npm run dev
```

The API runs at [http://localhost:5000](http://localhost:5000).

### 3. Run both apps

From the project root:

```bash
npm run dev:all
```

Or run in separate terminals:

```bash
npm run dev:api
npm run dev
```

Local frontend: [http://localhost:3000/](http://localhost:3000/)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/menu` | Categories + menu items |
| `GET` | `/api/menu/items` | All menu items |
| `POST` | `/api/menu/items` | Create menu item |
| `PUT` | `/api/menu/items/:itemId` | Update menu item |
| `DELETE` | `/api/menu/items/:itemId` | Delete menu item |
| `GET` | `/api/cart/:sessionId` | Get persisted cart |
| `POST` | `/api/cart/:sessionId/items` | Add item to cart |
| `PATCH` | `/api/cart/:sessionId/items/:menuItemId` | Update cart line |
| `DELETE` | `/api/cart/:sessionId` | Clear cart |
| `POST` | `/api/orders` | Place order from cart |
| `GET` | `/api/orders/:id` | Get order by id |
| `PATCH` | `/api/orders/:id` | Update order status |

## Build & deploy (frontend only)

```bash
npm run build
npm run deploy
```

GitHub Pages URL: `https://iftatbhuiyan.github.io/Restaurant-Website-Project---WebDev/`

> **Note:** GitHub Pages serves the static frontend only. The Express API must be hosted separately (Render, Railway, etc.) for production API access.

## Project structure

```
app/              # Next.js routes and layout
components/       # UI and page components
context/          # Cart state (synced with API)
lib/              # API client, session id, asset paths
data/             # Seed/reference data + gallery images
public/images/    # Food photos
server/           # Express + MongoDB API
scripts/          # Image compression helper
_legacy/          # Original static HTML/CSS/JS site
```

## Cart & orders

- Open `/menu/`
- Menu items are fetched from MongoDB via `GET /api/menu`
- Click **Add to Cart** — cart updates are saved to MongoDB
- **Checkout** creates an order in the `orders` collection and clears the cart
- Cart session id is stored in `localStorage` so refreshes keep your cart
