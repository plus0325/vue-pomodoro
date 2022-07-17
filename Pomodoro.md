###### 老師影片教學：220614 pomodoro
npm init vue@latest
npm i -D pug sass @vue/eslint-config-standard
如果重裝 vite eslint 安裝 standard 遇到版本衝突的話，把eslint-config-standard-main資料夾解壓縮到你的專案根目錄，然後打指令安裝
npm i -D ./eslint-config-standard-main
手動新增至 .eslintr.cjs
```js
module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/standard'
  ],
  // 手動手上以下--------------------
  env: {
    'vue/setup-compiler-macros': true
  },
  rules: {
    // 講義上寫(vue/script-setup-uses-vars': 'on')
    // 'vue/script-setup-uses-vars': 'on'
    // 220614影片改寫
    'no-unused-vars': 'off'
  }
}
```
自動修復eslint
在vscode設定內補上
```settings.json
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
},
```
安裝vuetify
vue add vuetify
選：Vite Preview (Vuetify 3 + Vite) 

資料夾整理(src原本的附的)
app.vue + HomeView.vue
```
<template lang="pug">
</template>
```
components資料夾 + stores資料夾內容清空
plusgins/vuetify.js
```js
export default createVuetify(
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides

  // 新增暗黑模式
  {
    theme: {
      defaultTheme: 'dark'
    }
  }
)
```
router/index.js 刪除about的路由
（因為目前我們只留home,如果不刪除打開http://localhost:3000/會有錯）
然後createWebHistory 都要改成 createWebHashHistory 
Hash模式 就是利用#做頁面的切換 （不然上傳github跳頁時會有問題）
```js
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    }
    // 暫時我們只有留home (HomeView.vue)
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})
```

設定倒數時間的環境變數（都要VITE開頭)
.env.development
  測試用(npm run dev 的時候會使用到)
  不上傳git就在最後面補上.local( .env.development.local )
.env.production
  打包用(上傳會使用到)

設定倒數時間
設定休息時間


google 分析
https://analytics.google.com/analytics/web/?authuser=1#/p319976153/reports/reportinghub?params=_u..nav%3Dmaui
套件 vite-plugin-radar
https://www.npmjs.com/package/vite-plugin-radar
npm i --save-dev vite-plugin-radar
```js
// vite.config.js
import ViteRadar from 'vite-plugin-radar'

export default {
  plugins: [
    ViteRadar({
      // Google Analytics tag injection
      analytics: {
        // // 這邊放google分析資料庫的ID(網頁串流詳情)
        id: 'G-XXXXX',
      },
    })
  ],
}
```
寫進去localstorage
套件 pinia-plugin-persistedstate
https://www.npmjs.com/package/pinia-plugin-persistedstate
npm i pinia-plugin-persistedstate


pwa
找個icon https://www.flaticon.com/
套件 Vue PWA asset generator
https://www.npmjs.com/package/vue-pwa-asset-generator
全域安裝 npm install --global vue-pwa-asset-generator
或者 直接執行 npx vue-pwa-asset-generator -a tomato.png -o ./public/img/icons
npx vue-pwa-asset-generator -a （圖片名稱 tomato.png) -o (安裝路徑./public/img/icons)
套件 npm i -D vite-plugin-pwa
https://www.npmjs.com/package/vite-plugin-pwa
匯入到
```js
// vite.config.js / vite.config.ts
import { VitePWA } from 'vite-plugin-pwa'

export default {
  plugins: [
    VitePWA()
  ]
}
```

meta
https://metatags.io/

vite打包index打開後是空白記得
在vite.congfig.js補上base: './'
```js
export default defineConfig({
  base: './',
  plugins: []
})
```