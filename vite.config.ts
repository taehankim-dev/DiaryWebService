// import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias : [
      {find : '@', replacement: path.resolve(__dirname, 'src')},
      // {find : '@', replacement: fileURLToPath(new URL('src', import.meta.url))},
      {find : '@components', replacement: path.resolve(__dirname, "src/components")},
      {find : '@pages', replacement: path.resolve(__dirname, "src/pages")},
      {find : '@states', replacement: path.resolve(__dirname, "src/states")},
      {find : '@hooks', replacement: path.resolve(__dirname, "src/hooks")},
      {find : '@customTypes', replacement: path.resolve(__dirname, "src/types")},
      {find : '@styles', replacement: path.resolve(__dirname, "src/styles")},
      {find : '@imgs', replacement: path.resolve(__dirname, "src/assets/imgs")},
      {find : '@fb', replacement: path.resolve(__dirname, "firebase.ts")},
    ]
  },
  base: "/DiaryWebService/",
  build: {
    outDir: 'dist',
  }
})
