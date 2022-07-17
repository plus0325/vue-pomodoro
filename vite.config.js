import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from 'vite-plugin-vuetify'

// vite-plugin-radar 分析套件
import ViteRadar from 'vite-plugin-radar'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
		vue(),
		vuetify({ autoImport: true }),
    ViteRadar({
      // Google Analytics tag injection
      analytics: {
        // 這邊放google分析資料庫的ID(網頁串流詳情)
        id: 'G-FVY0T4HR2K'
      },
    }),
    VitePWA({
      // https://web.dev/add-manifest/
      manifest: {
        // APP 名稱
        name: 'POMODORO',
        short_name: 'POMODORO',
        // APP 說明
        description: 'POMODORO',
        // APP 主題顏色
        theme_color: '#2E7D32',
        // APP 背景顏色
        background_color: '#DD2C00',
         // APP 顯示範圍
        scope: './',
        // APP 開始畫面網址
        start_url: './',
        // 顯示模式
        // browser: 瀏覽器
        // fullscreen: 全螢幕，隱藏所有瀏覽器 UI
        // standalone: 隱藏標準瀏覽器 UI ，如 URL 欄
        // minimal-ui: 有最小導覽列 UI
        display: 'standalone',
        // icon 路徑，./ 代表 public
        icons: [
          {
            src: "./img/icons/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "./img/icons/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "./img/icons/android-chrome-maskable-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "./img/icons/android-chrome-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "./img/icons/apple-touch-icon-60x60.png",
            sizes: "60x60",
            type: "image/png"
          },
          {
            src: "./img/icons/apple-touch-icon-76x76.png",
            sizes: "76x76",
            type: "image/png"
          },
          {
            src: "./img/icons/apple-touch-icon-120x120.png",
            sizes: "120x120",
            type: "image/png"
          },
          {
            src: "./img/icons/apple-touch-icon-152x152.png",
            sizes: "152x152",
            type: "image/png"
          },
          {
            src: "./img/icons/apple-touch-icon-180x180.png",
            sizes: "180x180",
            type: "image/png"
          },
          {
            src: "./img/icons/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png"
          },
          {
            src: "./img/icons/favicon-16x16.png",
            sizes: "16x16",
            type: "image/png"
          },
          {
            src: "./img/icons/favicon-32x32.png",
            sizes: "32x32",
            type: "image/png"
          },
          {
            src: "./img/icons/msapplication-icon-144x144.png",
            sizes: "144x144",
            type: "image/png"
          },
          {
            src: "./img/icons/mstile-150x150.png",
            sizes: "150x150",
            type: "image/png"
          }
        ]
      },
      // 設定自動更新的機制(registerType是註冊格式)(autoUpdate自動更新)
      registerType: 'autoUpdate',
      // 
      workbox: {
        // 自動清空舊的快取
        cleanupOutdatedCaches: true,
        ignoreURLParametersMatching: [/^[0-9a-zA-Z]*$/],
        // 緩存快取的檔案有哪些(規定)
        globPatterns: [
          '**/*.{js,css,html,mp3,woff,eot,ttf,woff2,ico,png,jpg,jpeg,svg,gif}**'
        ]
      }
    })
],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
