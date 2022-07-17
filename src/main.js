import { createApp } from 'vue'
// 掛載pinia
import pinia from './plugins/pinia'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
// 在 main.js 註冊 service worker (直接觸發自動更新PWA)
// https://rogeraabbccdd.github.io/F2E-book/views/ch25.html#pwa
import { registerSW } from 'virtual:pwa-register'

registerSW({
  onNeedRefresh () {},
  onOfflineReady () {}
})()

loadFonts()


createApp(App)
  .use(pinia)
  .use(router)
  .use(vuetify)
  .mount('#app')


// pinia 步驟
// src/main,js (掛載pinia)
// src/stores/seeting.js (創建store)
// src/veiws/SettingsView.vue (使用store)(解構store)