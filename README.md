<div align="center">
  <img src="public/logo.png" alt="DialyWear" width="420" />
  <br /><br />
  <h1>DialyWear</h1>
  <p><strong>Premium Clothing Storefront</strong></p>
  <p>
    A fully-featured e-commerce experience — cart management, dark/light mode,<br />
    WhatsApp ordering, and customer feedback — all client-side, zero backend.
  </p>
  <br />
  <p>
    <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
    <img src="https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/React_Router_v7-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router" />
    <img src="https://img.shields.io/badge/CSS_Custom_Properties-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS" />
    <br />
    <img src="https://img.shields.io/badge/license-MIT-22AD5C?style=for-the-badge" alt="License" />
    <img src="https://img.shields.io/badge/status-production-1F8ACB?style=for-the-badge" alt="Status" />
    <img src="https://img.shields.io/badge/build-passing-22AD5C?style=for-the-badge" alt="Build" />
    <img src="https://img.shields.io/badge/lint-0_errors-22AD5C?style=for-the-badge" alt="Lint" />
  </p>
</div>

<br />

---

## Table of Contents

- [Highlights](#-highlights)
- [Quick Start](#-quick-start)
- [Pages](#-pages)
- [Architecture](#-architecture)
- [Design System](#-design-system)
- [Configuration](#-configuration)
- [Tech Stack](#-tech-stack)
- [License](#-license)

---

## ✦ Highlights

<div>

| | | |
|---|---|---|
| 🛍️ **48 Products** — 8 categories including Down Shoulder, Polo, Round Neck, Oversize, Track Pants & more | 🛒 **Persistent Cart** — Slide-out drawer with quantity controls, localStorage persistence, and WhatsApp checkout |
| 🌗 **Dark/Light Mode** — System preference detection, manual toggle, persisted across sessions | ⭐ **Feedback System** — 3-step wizard with star rating, drag-and-drop photo upload, and live review gallery |
| 🔍 **Advanced Filtering** — Category, price range, size filters + sort by price + real-time search | 📱 **Fully Responsive** — Adaptive from 375px mobile to ultrawide desktop, touch-friendly |
| ⚡ **Performance** — Skeleton loaders, lazy image loading, CSS transforms for GPU-accelerated animations | 🚫 **Zero Backend** — Entirely client-side, static data, localStorage persistence |

</div>

---

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/ashrafhacker/dialywear.git
cd dialywear

# Install dependencies
npm install

# Start development server (Vite HMR at localhost:5173)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

## 📸 Pages

| Route | Page | Key Features |
|---|---|---|
| `/` | **Home** | Full-screen hero slider, category carousel, featured products, complete shop grid with filters |
| `/product/:id` | **Product Detail** | Image gallery with thumbnails, size chart toggle, fabric/fit/sleeve metadata, care instructions, similar products |
| `/about` | **About** | Brand story, animated stats count-up, mission/vision cards, USP grid, founder section, values |
| `/contact` | **Contact** | Contact form with WhatsApp integration, info cards (email, phone, location, hours), floating WhatsApp button |
| `/feedback` | **Feedback** | 3-step wizard (Rate → Write → Done), interactive star rating, photo upload with preview, review gallery |
| `/testimonials` | **Testimonials** | Customer testimonials sorted by date, card layout |
| `/categories` | **Categories** | Product catalog grouped by category |
| `/fabric` | **Fabric** | Fabric information and guides |

---

## 🧩 Architecture

```
src/
├── components/               # Reusable UI components
│   ├── Navbar.jsx           # Sticky nav with search, cart badge, theme toggle, mobile drawer
│   ├── ProductCard.jsx      # Product card with size selector, badges, add-to-cart, WhatsApp
│   ├── ProductModal.jsx     # Quick-view modal with image gallery, sizes, add-to-cart
│   ├── CartDrawer.jsx       # Slide-out cart with item list, quantity controls, WhatsApp checkout
│   ├── Hero.jsx             # Full-screen slider with gradient overlay, navigation, dots
│   ├── Footer.jsx           # 5-column footer with newsletter, social links, payment badges
│   ├── Categories.jsx       # Horizontal-scroll category carousel with snap
│   ├── Filter.jsx           # Filter sidebar with category, price, size, sort
│   ├── FeaturedProducts.jsx # Homepage section showing trending/badged products
│   ├── BackToTop.jsx        # Floating scroll-to-top button
│   └── WhatsAppFloat.jsx    # Persistent floating WhatsApp button
│
├── pages/                    # Route-level page components
│   ├── ProductDetail.jsx    # Full product page with gallery, size chart, details, similar items
│   ├── About.jsx            # Brand story, stats, mission, USP, founder, values, CTA
│   ├── Feedback.jsx         # Feedback form with star rating, photo upload, review gallery
│   ├── ContactPage.jsx      # Contact form + info cards
│   ├── testimonials.jsx     # Customer testimonials grid
│   ├── CategoriesPage.jsx   # Category browsing
│   └── Fabric.jsx           # Fabric information
│
├── context/                  # React Context providers
│   ├── CartContext.jsx      # Cart state via useReducer + localStorage persistence
│   ├── ThemeContext.jsx     # Dark/light toggle with system preference detection
│   └── ToastContext.jsx     # Toast notification system with auto-dismiss
│
├── data/                     # Static data sources
│   ├── product.js           # Full product catalog (48 items across 8 categories)
│   ├── testimonials.js      # Customer testimonials
│   └── feedbackData.js      # localStorage read/write helpers for feedback
│
├── styles/                   # CSS design tokens and component styles
│   ├── global.css           # Design tokens (light + dark), animations, brand classes, scrollbar
│   ├── navbar.css           # Sticky navbar, logo glow, search, mobile drawer
│   ├── products.css         # Product grid, cards, badges, quick-view, modal
│   ├── product-detail.css   # Detail page layout, gallery, size chart, meta panel
│   ├── filter.css           # Filter sidebar, mobile overlay, chips
│   ├── cart.css             # Cart drawer, item list, quantity controls
│   ├── hero.css             # Hero slider, gradient overlay, animations
│   ├── categories.css       # Category carousel
│   ├── footer.css           # Footer, newsletter, socials
│   ├── contact.css          # Contact page layout, form, WhatsApp float
│   ├── feedback.css         # Feedback wizard, star rating, photo upload, cards
│   └── toast.css            # Toast notifications
│
└── layout/
    └── Shop.jsx             # Shop page composition (filter + product grid)
```

---

## 🎨 Design System

All visual properties are controlled via CSS custom properties defined in `src/styles/global.css`, with automatic dark mode overrides.

### Design Tokens

```css
/* Typography */
--font-sans:    "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
--font-display: "Playfair Display", Georgia, serif;

/* Brand */
--brand:        #f5c518;
--brand-hover:  #e0b000;
--gradient-brand: linear-gradient(135deg, #FFD54F, #f5a623, #FF6B35);
--gradient-dark:  linear-gradient(135deg, #0a0a0a, #1a1a2e, #16213e);

/* Surfaces */
--bg-primary:   #ffffff;
--bg-secondary: #f8f8f8;
--text-primary: #0a0a0a;

/* Geometry */
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 20px;
--radius-xl: 28px;

/* Motion */
--transition:      0.25s cubic-bezier(0.4, 0, 0.2, 1);
--transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);

/* Shadows */
--shadow-md: 0 6px 20px rgba(0,0,0,0.08);
--shadow-lg: 0 12px 40px rgba(0,0,0,0.12);
```

Dark mode toggles `[data-theme="dark"]` — backgrounds invert, text lightens, shadows deepen.

---

## 🔧 Configuration

| Key | Value | Description |
|---|---|---|
| `dialywear_cart` | `localStorage` | JSON array of cart items with product, size, quantity |
| `dialywear_theme` | `localStorage` | `"light"` or `"dark"` |
| `dialywear_feedback` | `localStorage` | JSON array of submitted feedback entries |
| WhatsApp number | `CartContext`, `ContactForm`, `Feedback` | Business WhatsApp for orders and inquiries |
| Routing | `react-router-dom v7` | `<BrowserRouter>` with `<Routes>` |
| Fonts | Google Fonts | Playfair Display (headings) + Inter (body) |
| Icons | `react-icons` | Consistent SVG icon set |

---

## 🧪 Tech Stack

<div align="center">
  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" height="28" />
    <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" height="28" />
    <img src="https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white" height="28" />
    <img src="https://img.shields.io/badge/React_Icons-20232A?style=flat-square&logo=react&logoColor=61DAFB" height="28" />
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" height="28" />
    <img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white" height="28" />
  </p>
</div>

| Layer | Technology |
|---|---|
| **Framework** | React 18.3 |
| **Bundler** | Vite 6 |
| **Routing** | React Router DOM v7 |
| **State** | React Context (useReducer for cart) |
| **Styling** | CSS Custom Properties (design tokens) |
| **Icons** | React Icons |
| **Fonts** | Google Fonts (Playfair Display + Inter) |
| **Storage** | Web localStorage API |
| **Linting** | ESLint 9 (flat config) |

---

## 📄 License

```
MIT License

Copyright (c) 2026 DialyWear

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

<div align="center">
  <br />
  <p>
    <sub>Built with ❤️ using React + Vite</sub>
  </p>
</div>
