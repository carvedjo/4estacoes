# 4 Estações

Online plant shop with an admin panel built as a portfolio project.

## Demo

### Home & Shop
![Homepage&Shop](./4estacoesGIFhome.gif)

### Admin
![Admin](./4estacoesGIFAdmin.gif)

## Links
- [Live Demo](https://4estacoes-shop.vercel.app)
- Admin access — contact me at edd7carvalho@gmail.com

## Stack
- Next.js 15 (App Router)
- TypeScript
- Supabase (database + auth + storage)
- CSS Modules

## Features
- Plant catalogue with featured section
- Shopping cart with navbar dropdown
- Promotional pricing
- Protected admin panel with authentication
- Full CRUD for plants
- Image upload via Supabase Storage

## Technical Decisions

- Server Components for data fetching — plant data is fetched server-side using async components, keeping API calls out of the client bundle
- Cart state managed with Context API — shared across Navbar, product pages and cart page without prop drilling
- Supabase RLS policies — database-level security ensures only authenticated users can modify data, regardless of frontend access
- Image upload via Supabase Storage — admin can upload images directly instead of relying on external URLs
- CSS Modules throughout — scoped styles prevent conflicts and keep component styles isolated
- Promotional pricing logic — `promo_price` field allows per-product discounts with strikethrough display across all views
- `revalidate = 0` on shop pages — ensures product changes in admin are immediately reflected without stale cache


## Local Setup

```bash
npm install
npm run dev
```

Create a `.env.local` file with your Supabase keys:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```
