import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/02-vite-project/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        spravochnye: resolve(__dirname, 'pages/spravochnye-svedeniya.html'),
        sostav: resolve(__dirname, 'pages/sostav-gruppy.html'),
        organizatsiya: resolve(__dirname, 'pages/organizatsiya-pohoda.html'),
        kartograficheskiy: resolve(__dirname, 'pages/kartograficheskiy-material.html'),
        tehniicheskoe: resolve(__dirname, 'pages/tehniicheskoe-opisanie.html'),
        grafik: resolve(__dirname, 'pages/grafik-dvizheniya.html'),
        itogi: resolve(__dirname, 'pages/itogi-vyvody.html'),
        prilozhenie1: resolve(__dirname, 'pages/prilozhenie-1.html'),
        prilozhenie2: resolve(__dirname, 'pages/prilozhenie-2.html')
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
