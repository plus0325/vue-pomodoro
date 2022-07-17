import { defineStore } from 'pinia'
// 引入環境變數的時間設定(vite固定寫法)
const time = parseInt(import.meta.env.VITE_TIME)
const timebreak = parseInt(import.meta.env.VITE_TIMEBREAK)

export const useListStore = defineStore({
  id: 'list',
      // 邏輯 將項目items的文字拉出來放到目前正在處理的current,25分鐘倒數結束再放到finished已完成
  state () {
    // 這邊是目前的狀態(初始化) ------------------------
    return {
      // 項目
      items: [],
      // 已完成
      finished: [],
      // 目前正在處理的
      current: '',
      // 讓每個紀錄唯一值(怕重複問題)
      id: 1,
      // 蕃茄鐘休息的狀態
      break: false,
      // 倒數幾秒
      timeleft: time,
      // 跳通知
      notify: false
    }
  },
  // 修改settingn所有的function
  actions: {
    // data參數需要動態去更新，所以在ListView.vue需要增加storeToRefs(list)
    // 新增項目 ---------------->
    addItem (data) {
      // 需要用this去呼叫上面的 state (固定寫法) 
      this.items.push({
        id: this.id++,
        name: data,
        // edit 編輯開關（目前關）
        edit: false,
        // 動態正在修改的資料狀況
        model: data
      })
    },
    // 刪除項目 ---------------->
    delItem(i) {
      this.items.splice(i,1)
    },
    editItem(i) {
      this.items[i].edit = true
    },
    // 編輯項目(確認) ---------------->
    confirmEdiItem (i) {
      this.items[i].name = this.items[i].model
      this.items[i].edit = false
    },
    // 編輯項目(取消) ---------------->
    cancelEditItem (i) {
      this.items[i].model = this.items[i].name
      this.items[i].edit = false
    },
    // 倒數程式 ---------------->
    countdown () {
      this.timeleft--
    },
    // 按下開始按鈕後執行的開始 ---------------->
    start () {
      // 抓取state裡的目前狀態current
      // 如果是休息時間。就顯示‘休息一下’，否則就是取items陣列的第一個(?)-->是指下一個項目名嗎？？？
      this.current = this.break ? '休息一下' : this.items.shift().name
    },
    // 結束後 ---------------->
    finish () {
      // 先判斷是否為休息時間
      // a.如果不是休息時間的話，就push已完成的事項
      if (!this.break) {
        // 已完成的事項（目前事項放入)
        this.finished.push({
          name: this.current,
          id: this.id++
        })
      }
      // 跳通知會需要一些時間。所以把舊的狀態先存起來
      const oldCurrent = this.current
      // 通知內容
      const notification = new Notification('事項完成', {
        body: oldCurrent,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/LINE_New_App_Icon_%282020-12%29.png',
      })
      // 目前事項清空
      this.current = ''
      // b.如果還有項目的話。就相休息時間打開
      if (this.items.length > 0) {
        this.break = !this.break
      }
      // 如果是休息就是休息的秒數，如果不是就換為倒數的秒數
      this.timeleft = this.break ? timebreak : time
    },
    // 切換跳通知 ---------------->
    // Notification 通知
    toggleNotify () {
      // 如果目前狀態是沒有開通知＋檢查瀏覽器是否接受可以開啟通知
      if (!this.notify && 'Notification'in window) {
        // Notification.requestPermission() 方法請求用戶當前來源的權限以顯示通知。
        Notification.requestPermission(permission => {
          // 假如使用者請求是允許(接受）的就跳通知（語法是固定這樣寫)
          if (permission === 'granted') {
            this.notify = true
          }
        })
      } else {
        this.notify = false 
      }
    }
  },
  // 用 pinia-plugin-persistedstate 存 localstorage
  persist: {
    // https://www.npmjs.com/package/pinia-plugin-persistedstate
    key: 'pomodoro-list'
  }
})