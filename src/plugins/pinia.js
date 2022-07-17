
// main.js打開後沒有引入pinia ，所以我們自己製作一個創建pinia來讓main.js use
import { createPinia } from 'pinia'
// 使用p inia-plugin-persistedstate 來處理 localstorage
// https://www.npmjs.com/package/pinia-plugin-persistedstate
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia