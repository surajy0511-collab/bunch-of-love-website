# Bunch of Love — Premium Floral Boutique Website

React + Vite + TypeScript + Tailwind CSS. Fully static: catalogue, cart (saved in the browser) and WhatsApp checkout all run in the browser — no backend needed.

---

## 1. Before you go live

Already set: WhatsApp number (+91 63625 80121) in `src/config.ts` and the official logo in `public/images/brand/`.

| What | Where |
|---|---|
| WhatsApp number (to change later) | `src/config.ts` → `WHATSAPP_NUMBER` (digits only with country code) |
| Logo (to change later) | `public/images/brand/Bunch_of_Love_Logo.png` |
| **Bouquet photos (55)** | `public/images/bouquets/` — use the **exact** filenames listed in `src/data/products.ts` |
| Founder photo (optional) | `public/images/founder/anjali-founder.jpg` |
| Hero photo (to change later) | `public/images/hero/hero-bouquet.jpg` (keep the same name) |
| Instagram link (optional) | `src/config.ts` → `INSTAGRAM_URL` |

Images appear automatically once the file exists with the right name. Until then an elegant empty frame is shown.
Spaces, `&` and apostrophes in filenames are fine — the code URL-encodes them.

## 2. Run locally

Requires Node.js 18+ and Yarn (`npm install -g yarn`).

```bash
yarn install
yarn dev        # http://localhost:3000
```

## 3. Build

```bash
yarn build      # output in dist/
yarn preview    # preview the production build
```

## 4. Deploy to GitHub Pages (username.github.io/repo-name)

1. Create a new GitHub repository (e.g. `bunch-of-love`) and upload **all** files from this folder
   (including the hidden `.github` folder).
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to the `main` branch. The workflow in `.github/workflows/deploy.yml` builds and publishes automatically.
4. Your site will be live at `https://<username>.github.io/<repo-name>/`.

The workflow sets the correct base path from your repository name automatically — no config edits needed.
The site uses hash-based routes (`/#/about`), so refreshing any page always works on GitHub Pages.

## 5. Use a custom domain (e.g. www.bunchoflove.in)

1. Create a file `public/CNAME` containing only your domain, e.g. `www.bunchoflove.in`.
   (When this file exists, the workflow automatically builds with base path `/`.)
2. At your domain provider, add DNS records:
   - `www` → **CNAME** → `<username>.github.io`
   - For the root domain (`bunchoflove.in`) add **A** records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. In **Settings → Pages**, enter the custom domain and tick **Enforce HTTPS** once available.
4. Push to `main` to redeploy.

## 6. Project structure

```
public/
  favicon.svg
  images/
    bouquets/   ← 55 bouquet photos (exact filenames)
    brand/      ← Bunch_of_Love_Logo.png
    founder/    ← anjali-founder.jpg
src/
  config.ts            ← WhatsApp number, Instagram link
  data/products.ts     ← full catalogue (single source of truth)
  context/CartContext  ← cart state + localStorage
  components/          ← Header, HeroSection, PriceCategorySection, ProductGrid, ProductCard,
                         OccasionFilter, CartDrawer, CartItem, CustomBouquetSection,
                         BulkBookingSection, TestimonialsSection, Footer …
  pages/Home.tsx, pages/About.tsx
```

## Notes

- The supplied list contains **55** bouquets (18 + 21 + 16). To add another, append one line to `src/data/products.ts`.
- Testimonials are clearly marked placeholders — replace them in `src/components/TestimonialsSection.tsx` with real customer words.
- Checkout opens WhatsApp with a pre-filled order; orders are confirmed by you on WhatsApp. The cart is not cleared automatically.
