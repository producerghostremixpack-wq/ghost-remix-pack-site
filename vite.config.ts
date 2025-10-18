import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    open: true, // Ouvre automatiquement le navigateur au démarrage
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Retire les console.log en production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react', 'framer-motion'],
          'stripe-vendor': ['@stripe/stripe-js']
        }
      }
    },
    sourcemap: false, // Désactive les source maps en production pour réduire la taille
    chunkSizeWarningLimit: 1000 // Avertit si un chunk dépasse 1MB
  }
})

