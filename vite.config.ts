import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
  
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'recharts',
      'lucide-react',
    ],
    exclude: [
      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-aspect-ratio',
      '@radix-ui/react-avatar',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-collapsible',
      '@radix-ui/react-context-menu',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-hover-card',
      '@radix-ui/react-label',
      '@radix-ui/react-menubar',
      '@radix-ui/react-navigation-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-progress',
      '@radix-ui/react-radio-group',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-select',
      '@radix-ui/react-separator',
      '@radix-ui/react-slider',
      '@radix-ui/react-slot',
      '@radix-ui/react-switch',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toggle-group',
      '@radix-ui/react-toggle',
      '@radix-ui/react-tooltip',
      '@emotion/react',
      '@emotion/styled',
      '@mui/material',
      '@mui/icons-material',
      '@popperjs/core',
      'class-variance-authority',
      'clsx',
      'cmdk',
      'date-fns',
      'embla-carousel-react',
      'input-otp',
      'next-themes',
      'react-day-picker',
      'react-dnd',
      'react-dnd-html5-backend',
      'react-hook-form',
      'react-popper',
      'react-resizable-panels',
      'react-responsive-masonry',
      'react-router',
      'react-slick',
      'sonner',
      'tailwind-merge',
      'tw-animate-css',
      'vaul',
    ],
  },
  
  server: {
    fs: {
      strict: false,
    },
  },
  
  build: {
    target: 'esnext',
  },
})