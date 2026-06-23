# DialyWear - Premium Clothing Store

A modern, fully-featured e-commerce storefront built with React + Vite. Features a complete shopping experience with cart management, dark/light mode, product filtering, WhatsApp ordering, and a professional feedback system.

## Features

### Shopping
- **Product Catalog** — 48 products across 8 categories (Down Shoulder, Polo T-Shirts, Round Neck, Half Sleeves, Full Sleeves, Over Size, Track Pants, Combos)
- **Product Detail Page** — Image gallery with thumbnails, size chart, fabric/fit/sleeve metadata, fabric care details, similar products
- **Product Quick View** — Modal preview with image gallery, size selector, add to cart, and WhatsApp ordering
- **Advanced Filtering** — Filter by category, price range, size, and sort by price (low-high, high-low)
- **Search** — Real-time product search across names, categories, and descriptions
- **Featured Products** — Handpicked trending items on the homepage

### Cart System
- **Persistent Cart** — Cart state saved to localStorage, survives page refreshes
- **Slide-out Drawer** — Cart accessible from navbar, shows item list with quantity controls
- **Quantity Management** — Increase, decrease, or remove items directly in the cart
- **WhatsApp Checkout** — Send entire cart summary as a WhatsApp message for ordering
- **Toast Notifications** — Non-intrusive feedback for add-to-cart, errors, and successes

### User Experience
- **Dark/Light Mode** — Theme toggle with system preference detection, persisted to localStorage
- **Responsive Design** — Fully responsive from 375px mobile to desktop
- **Hero Slider** — Full-screen promotional slider with navigation arrows and dots
- **Category Carousel** — Horizontal scrollable category cards with snap scrolling
- **Skeleton Loaders** — Shimmer loading states for product grid
- **Breadcrumbs** — Navigation breadcrumbs on product detail pages
- **Back to Top** — Floating button to scroll to top
- **WhatsApp Float** — Persistent floating WhatsApp contact button

### Feedback System
- **Multi-step Form** — 3-step wizard (Rate → Write → Done) with progress indicator
- **Star Rating** — Interactive 5-star SVG rating with hover states and labels
- **Photo Upload** — Drag-and-drop or click-to-browse, max 6 images (5MB each), with preview and remove
- **Product Selector** — Dropdown to关联 feedback with a specific product
- **LocalStorage Persistence** — All feedback stored locally and displayed in a gallery
- **WhatsApp Submission** — Feedback summary sent to business WhatsApp on submit
- **Feedback Gallery** — Submitted reviews displayed as cards with avatars, ratings, photos, and product tags

### Pages
- **Home** — Hero slider, categories, featured products, full shop
- **Shop** — Product grid with filtering and search
- **Product Detail** — `/product/:id` with gallery, size chart, details, similar items
- **About** — Brand story, stats, mission, USP, founder, values
- **Contact** — Contact form + WhatsApp integration
- **Testimonials** — Customer testimonials grid
- **Feedback** — `/feedback` — Submit and browse customer feedback
- **Categories** — `/categories` — Browse by category
- **Fabric** — `/fabric` — Fabric information

## Tech Stack

- **Framework** — React (Vite)
- **Routing** — React Router DOM
- **Styling** — CSS custom properties (design tokens), responsive design
- **State Management** — React Context (Cart, Theme, Toast)
- **Storage** — localStorage for cart, theme preference, and feedback
- **Icons** — React Icons
- **Fonts** — Playfair Display + Inter (Google Fonts)
- **Build** — Vite

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── context/        # React Context providers (Cart, Theme, Toast)
├── data/           # Static product catalog and testimonials
├── layout/         # Layout components (Shop)
├── pages/          # Route pages
└── styles/         # CSS files
```

## Configuration

- **Theme Persistence** — Stored in localStorage key `dialywear_theme`
- **Cart Persistence** — Stored in localStorage key `dialywear_cart`
- **Feedback Storage** — Stored in localStorage key `dialywear_feedback`

## License

MIT
