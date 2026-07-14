import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/styles': path.resolve(__dirname, './src/styles'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/views': path.resolve(__dirname, './src/views'),
      '@/stores': path.resolve(__dirname, './src/stores'),
      '@/router': path.resolve(__dirname, './src/router'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/data': path.resolve(__dirname, './src/data'),
      '@/i18n': path.resolve(__dirname, './src/i18n'),
      '@/composables': path.resolve(__dirname, './src/composables'),
    },
  },
})