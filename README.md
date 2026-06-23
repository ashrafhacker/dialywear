<div align="center">
  <img src="public/logo.png" alt="DialyWear" width="400" />
  <br /><br />
  <h1>DialyWear</h1>
  <p><strong>Enterprise-Grade E-Commerce Frontend</strong><br />Zero-Backend &middot; React 18 &middot; Vite 6</p>
  <p>
    <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
    <img src="https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
    <img src="https://img.shields.io/badge/license-MIT-22AD5C?style=for-the-badge" />
    <img src="https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge" />
    <img src="https://img.shields.io/badge/lint-0_errors-brightgreen?style=for-the-badge&logo=eslint" />
  </p>
</div>

---

## Table of Contents

- [Quick Start](#quick-start)
- [Features](#features)
- [Pages](#pages)
- [Architecture](#architecture)
- [Design System](#design-system)
- [Configuration](#configuration)
- [Performance](#performance)
- [Tech Stack](#tech-stack)
- [License](#license)

---

## Quick Start

```bash
git clone https://github.com/ashrafhacker/dialywear.git
cd dialywear
npm install
npm run dev     # Dev server at localhost:5173
npm run build   # Production build
npm run lint    # ESLint
```

---

## Features

### Shopping Experience
- **48 Products** across 8 categories (Down Shoulder, Polo, Round Neck, Half Sleeves, Full Sleeves, Oversize, Track Pants, Combos)
- **Product Detail Page** with image gallery, size chart (inches), fabric/fit/sleeve metadata, care instructions, similar products
- **Quick-View Modal** from any product card
- **Advanced Filtering** — category, price range, size, sort by price
- **Real-time Search** across name, category, and description
- **Featured Products** — curated homepage section with Sale/New/Hot badges
- **Category Carousel** — horizontal scroll with snap

### Cart & Checkout
- **Persistent Cart** — serialized to localStorage, survives all sessions
- **Slide-out Drawer** — item list with product image, name, size, quantity, price
- **Quantity Controls** — increment, decrement, remove with live subtotal
- **WhatsApp Checkout** — one-tap sends cart summary to business WhatsApp
- **Toast Notifications** — success/error feedback with auto-dismiss

### User Interface
- **Dark / Light Mode** — system-preference detection, manual toggle, localStorage persistence
- **Responsive Design** — adaptive grid from 375px mobile to 4K desktop
- **Hero Slider** — full-screen rotating banners with gradient overlay, arrows, dots
- **Skeleton Loaders** — shimmer placeholders, zero layout shift
- **Product Badges** — Sale (% off), New, Hot on cards + detail page
- **Glassmorphism Navbar** — sticky with backdrop-blur
- **Back-to-Top** button, floating WhatsApp button, breadcrumbs
- **Animated Stats** — count-up via IntersectionObserver on About page

### Feedback System
- **3-Step Wizard** — Rate (stars) &rarr; Write (form) &rarr; Done (confirmation)
- **Interactive Star Rating** — 5 SVG stars with hover preview and labels
- **Photo Upload** — drag-and-drop, max 6 images at 5MB each, preview + remove
- **Product Linking** — associate feedback with a catalog item
- **localStorage Persistence** — all feedback saved and displayed live
- **WhatsApp Submission** — full summary sent on submit
- **Review Gallery** — cards with avatar, stars, product tag, photos

---

## Pages & Routes

| Route | Page | Key Features |
|-------|------|-------------|
| `/` | Home | Hero slider, categories, featured products, shop grid |
| `/product/:id` | Product Detail | Gallery, size chart, meta panel, care, similar items |
| `/about` | About | Brand story, animated stats, mission, USP, founder |
| `/contact` | Contact | Form to WhatsApp, info cards, WhatsApp float |
| `/feedback` | Feedback | Rating, photo upload, review gallery |
| `/testimonials` | Testimonials | Customer testimonials sorted by date |
| `/categories` | Categories | Products grouped by category |
| `/fabric` | Fabric | Fabric information and care guides |

---

## Architecture

```
src/
+-- components/           Reusable UI
|   +-- Navbar.jsx        Sticky nav, search, cart badge, theme toggle
|   +-- ProductCard.jsx   Card with sizes, badges, add-to-cart
|   +-- ProductModal.jsx  Quick-view modal
|   +-- CartDrawer.jsx    Slide-out cart
|   +-- Hero.jsx          Full-screen slider
|   +-- Footer.jsx        5-column footer
|   +-- Filter.jsx        Filter sidebar
|   +-- FeaturedProducts.jsx
|   +-- Categories.jsx    Category carousel
|   +-- ContactForm.jsx   Contact form
|   +-- BackToTop.jsx     Scroll-to-top
|   +-- WhatsAppFloat.jsx Floating WhatsApp
|
+-- pages/                Route pages
|   +-- ProductDetail.jsx
|   +-- About.jsx
|   +-- Feedback.jsx
|   +-- ContactPage.jsx
|   +-- testimonials.jsx
|   +-- CategoriesPage.jsx
|   +-- Fabric.jsx
|
+-- context/              State management
|   +-- CartContext.jsx    useReducer + localStorage
|   +-- ThemeContext.jsx   Dark/light toggle
|   +-- ToastContext.jsx   Notifications
|
+-- data/                 Static data
|   +-- product.js        48 products
|   +-- testimonials.js
|   +-- feedbackData.js   localStorage helpers
|
+-- styles/               CSS design tokens
|   +-- global.css        Variables, animations, brand
|   +-- *.css             Per-component styles
|
+-- layout/               Layout compositions
    +-- Shop.jsx          Filter + product grid
```

### Data Flow

```
User Action -> Component -> Context Dispatch -> State Update -> Re-render -> localStorage Sync
                                 |
                          (WhatsApp action)
                          window.open(whatsapp://)
```

### State Management

| Context | Type | Persistence | Description |
|---------|------|-------------|-------------|
| CartContext | useReducer | localStorage | Add, remove, update quantity |
| ThemeContext | useState | localStorage | Light/dark toggle |
| ToastContext | useState | None | Auto-dismiss notifications (3s) |

---

## Design System

All visual properties in `src/styles/global.css` use CSS custom properties:

```css
:root {
  --font-sans: "Inter", -apple-system, sans-serif;
  --font-display: "Playfair Display", Georgia, serif;
  --brand: #f5c518;
  --gradient-brand: linear-gradient(135deg, #FFD54F, #f5a623, #FF6B35);
  --bg-primary: #ffffff;
  --bg-secondary: #f8f8f8;
  --text-primary: #0a0a0a;
  --text-secondary: #555555;
  --border: #e8e8e8;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --shadow-md: 0 6px 20px rgba(0,0,0,0.08);
  --transition: 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

[data-theme="dark"] {
  --bg-primary: #0a0a0a;
  --bg-secondary: #121212;
  --text-primary: #f0f0f0;
  --text-secondary: #aaaaaa;
  --border: #2a2a2a;
}
```

### Animation Tokens

| Element | Technique | Duration | Easing |
|---------|-----------|----------|--------|
| Card hover | translateY + shadow | 250ms | cubic-bezier(0.4, 0, 0.2, 1) |
| Modal | scale + fade | 300ms | ease-out |
| Cart drawer | translateX slide | 300ms | ease-out |
| Toast | slide-down + fade | 300ms | ease-in-out |
| Hero | opacity crossfade | 500ms | ease-in-out |

All animations respect `prefers-reduced-motion`.

---

## Configuration

| Key | Type | Description |
|-----|------|-------------|
| `dialywear_cart` | localStorage | Cart state as JSON array |
| `dialywear_theme` | localStorage | "light" or "dark" |
| `dialywear_feedback` | localStorage | Submitted feedback entries |
| WhatsApp number | Hardcoded | Configured in CartContext, ContactForm, Feedback |
| Product data | Static import | src/data/product.js (48 items) |

---

## Performance

- **CSS Custom Properties** — theme switching without repaints
- **CSS Transforms** — GPU-accelerated animations (no layout thrashing)
- **Skeleton Loaders** — prevent Cumulative Layout Shift (CLS)
- **Static Data** — zero network requests for content
- **localStorage** — synchronous, non-blocking persistence
- **Vite Build** — tree-shaking, code-splitting, minification

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18.3 |
| Bundler | Vite 6 |
| Routing | React Router DOM v7 |
| State | Context + useReducer |
| Styling | CSS Custom Properties |
| Icons | React Icons |
| Fonts | Google Fonts (Playfair Display + Inter) |
| Storage | Web localStorage |
| Linting | ESLint 9 |

---

## License

MIT
