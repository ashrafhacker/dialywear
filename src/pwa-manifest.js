// PWA manifest for mobile installation
export const pwaManifest = {
  name: 'DialyWear - Enterprise E-Commerce',
  short_name: 'DialyWear',
  description: 'Enterprise-grade e-commerce frontend with zero backend',
  theme_color: '#ffffff',
  background_color: '#ffffff',
  display: 'standalone',
  scope: '/dialywear/',
  start_url: '/dialywear/',
  icons: [
    {
      src: 'pwa-192x192.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'any'
    },
    {
      src: 'pwa-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any'
    },
    {
      src: 'pwa-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'maskable'
    }
  ],
  screenshots: [
    {
      src: 'screenshot-mobile.png',
      sizes: '375x667',
      type: 'image/png',
      form_factor: 'narrow'
    },
    {
      src: 'screenshot-desktop.png',
      sizes: '1920x1080',
      type: 'image/png',
      form_factor: 'wide'
    }
  ]
};