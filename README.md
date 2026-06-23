<p align="center">
  <img src="public/logo.png" alt="DialyWear" width="400" />
</p>

<h1 align="center">DialyWear — Premium Clothing Storefront</h1>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Router-DOM_v7-CA4245?logo=react-router&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/ESLint-9-4B32C3?logo=eslint&logoColor=white" alt="ESLint" />
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License" />
  <img src="https://img.shields.io/badge/status-production-brightgreen" alt="Status" />
</p>

<p align="center">
  A fully-featured e-commerce storefront with cart management, dark/light mode, WhatsApp ordering, and customer feedback system — all powered by React + Vite with zero backend dependencies.
</p>

<hr />

## ✨ Highlights

| Capability | Detail |
|---|---|
| **Catalog** | 48 products across 8 categories |
| **Cart** | Persistent drawer with quantity control & WhatsApp checkout |
| **Theme** | Dark/light mode with system-preference detection |
| **Feedback** | 3-step wizard with star rating & photo upload |
| **Search & Filter** | Real-time search, category/price/size filtering, sort |
| **Performance** | Skeleton loaders, lazy images, CSS animations |
| **Responsive** | 375px → 4K with adaptive grid & navigation |
| **Zero Backend** | All data static, cart/theme saved via localStorage |

## 🚀 Quick Start

```bash
# Install
npm install

# Dev server (Vite HMR)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

## 📸 Pages

| Route | Page | Features |
|---|---|---|
| `/` | **Home** | Hero slider, category carousel, featured products, full shop grid |
| `/product/:id` | **Product Detail** | Image gallery w/ thumbs, size chart, fabric/fit/sleeve meta, care details, similar products |
| `/about` | **About** | Brand story, mission/vision, stats count-up, USP, founder, values |
| `/contact` | **Contact** | Contact form → WhatsApp, info cards, floating WhatsApp button |
| `/feedback` | **Feedback** | 3-step wizard (Rate → Write → Done), star rating, photo upload, review gallery |
| `/testimonials` | **Testimonials** | Customer testimonials sorted by date |
| `/categories` | **Categories** | Browse product catalog by category |
| `/fabric` | **Fabric** | Fabric information and guides |

## 🧩 Architecture

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx       # Sticky nav w/ search, cart badge, theme toggle
│   ├── ProductCard.jsx  # Card w/ size selector, badges, add-to-cart
│   ├── ProductModal.jsx # Quick-view modal w/ gallery & ordering
│   ├── CartDrawer.jsx   # Slide-out cart w/ quantity controls
│   ├── Hero.jsx         # Full-screen slider w/ gradient overlay
│   ├── Footer.jsx       # 5-column footer w/ newsletter, socials
│   └── ...              # Categories, Filter, ContactForm, etc.
│
├── pages/               # Route-level page components
│   ├── ProductDetail.jsx
│   ├── About.jsx
│   ├── Feedback.jsx
│   └── ...
│
├── context/             # React Context providers
│   ├── CartContext.jsx   # useReducer + localStorage cart state
│   ├── ThemeContext.jsx  # Dark/light toggle w/ system-pref detection
│   └── ToastContext.jsx  # In-page toast notifications
│
├── data/                # Static data sources
│   ├── product.js       # Full catalog (48 products)
│   └── testimonials.js  # Customer testimonials
│
├── styles/              # CSS design tokens & component styles
│   ├── global.css       # CSS custom properties (light/dark), animations
│   └── ...
│
└── layout/              # Layout compositions
    └── Shop.jsx         # Product grid + filter sidebar
```

## 🎨 Design System

All visual properties are controlled via CSS custom properties in `src/styles/global.css`:

```css
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8f8f8;
  --text-primary: #0a0a0a;
  --brand: #f5c518;
  --font-sans: "Inter", -apple-system, sans-serif;
  --font-display: "Playfair Display", Georgia, serif;
  --gradient-brand: linear-gradient(135deg, #FFD54F, #f5a623, #FF6B35);
  --radius-sm: 8px;
  --radius-lg: 20px;
  --transition: 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
```

Dark mode overrides via `[data-theme="dark"]` — background colors invert, text colors lighten, shadows deepen.

## 🔧 Configuration

| Setting | Details |
|---|---|
| **Cart persistence** | `localStorage` key `dialywear_cart` |
| **Theme persistence** | `localStorage` key `dialywear_theme` |
| **Feedback storage** | `localStorage` key `dialywear_feedback` |
| **WhatsApp business** | Configured in CartContext, ContactForm, Feedback |
| **Routing** | React Router v7 with `<BrowserRouter>` |
| **Fonts** | Google Fonts: Playfair Display (headings) + Inter (body) |

## 🧪 Stack

<p>
  <img src="https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB" height="24" />
  <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white" height="24" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=white" height="24" />
  <img src="https://img.shields.io/badge/React_Icons-20232A?logo=react&logoColor=61DAFB" height="24" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white" height="24" />
  <img src="https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white" height="24" />
</p>

## 📄 License

MIT
