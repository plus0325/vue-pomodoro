// src/stores/seeting.js

// 創建定義存東西的Store
import { defineStore } from "pinia"

// alarm 的資料(原本沒有將SettingsView.vue的資料搬過來前寫的)
// export const useSettingsStore = defineStore({
//   id: 'settings',
//   state () {
//     return {
//       selectedAlarm: 1
//     }
//   }
// })

// alarm 的資料
export const useSettingsStore = defineStore({
  id: 'settings',
  state () {
    return {
      selectedAlarm: 1,
      alarms: [
        { 
          id: 1,
          name: 'Alarm',
          // 引用資源（Ch.23 Vite 與單元件檔案）
          file: new URL('../assets/alarm.mp3', import.meta.url).href
        },
        { 
          id: 2,
          name: 'Yay',
          file: new URL('../assets/yay.mp3', import.meta.url).href
        }
      ]
    }
  },
  getters: {
    selectedAlarmFile () {
      const idx = this.alarms.findIndex(a => a.id === this.selectedAlarm)
      return this.alarms[idx].file
    }
  },
  // 用 pinia-plugin-persistedstate 存 localstorage
  persist: {
    // https://www.npmjs.com/package/pinia-plugin-persistedstate
    key: 'pomodoro-settings',
    // 哪些要存的
    paths: ['selectedAlarm']
  }
})



// selected 選擇
// stores 管理