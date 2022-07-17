<template lang="pug">

<v-row id="home" class="text-center">
  <v-col cols="12">
    <h1>{{ currentText }}</h1>
    <h1>{{ timeText }}</h1>
  </v-col>
  //- v-col 包住的東西好像都會變成block各自一行佔滿版面？？？？？？？？？？？？
  <v-col cols="12" class="d-flex flex-row justify-center">
    //- 設定按鈕出現的時間點(0 = 停止)(1 = 倒數中)(2 = 暫停)
    //- 當status狀況不是倒數的時候會 出現play按鈕 -----------------------------
    <v-btn icon="icon" color="green" class="mx-3" v-if="status !== 1" @click="startTimer">
       <v-icon color="white">mdi-play</v-icon>
    </v-btn>
    //- 否則就出現暫停按鈕(暫停跟播放不會同時出現) -----------------------------
    <v-btn icon="icon" color="blue" class="mx-3" v-else @click="pauseTimer">
      <v-icon color="white">mdi-pause</v-icon>
    </v-btn>
    //- 當目前current處理的項目 一個以上的時候會出現 下一個按鈕  -----------------------------
    <v-btn icon="icon" color="red" class="mx-3" v-if="current.length > 0" @click="finishTimer(true)">
       <v-icon color="white">mdi-skip-next</v-icon>
    </v-btn>

  </v-col>
  <div class="o"></div>
</v-row>

//- v-row.text-center#home
//-   v-col(cols="12")
//-     h1 {{ currentText }}
//-     h1 {{ timeText }}
//-   v-col(cols="12")
//-     v-btn(icon color="green")
//-       v-icon(color="white") mdi-play
//-     v-btn(icon color="blue")
//-       v-icon mdi-pause
//-     v-btn(icon color="red")
//-       v-icon mdi-skip-next

</template>

<script setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useListStore } from '@/stores/list.js'
import { useSettingsStore } from '@/stores/settings'



const list = useListStore()
const { current, items, timeleft } = storeToRefs(list)
const { countdown, start, finish } = list

const settings = useSettingsStore()
const { selectedAlarmFile } = storeToRefs(settings)

// 當前事項文字顯示
const currentText = computed(() => {
  return current.value.length > 0 ? current.value : items.value.length > 0 ? '點擊開始' : '沒有事項'
})

// 倒數時間顯示
const timeText = computed(() => {
  // 分 m兩位數
  // padStart(2,'0') 前面的2是填充到要的長度所以兩位數，用0來填
  const m = Math.floor(timeleft.value / 60).toString().padStart(2, '0')
  // 秒 s兩位數
  const s = (timeleft.value % 60).toString().padStart(2, '0')

  return m + ':' +s
})


// 當時後畫面倒數時間中顯示的狀態（按鈕）
let timer = ''
// 記錄目前的狀態 (0 = 停止) (1 = 倒數中) (2 = 暫停) 來判斷要執行的方式
const status = ref(0)


// 當按下暫停鍵時 目前狀態的值是2暫停 (手動）----------------------------------------
const pauseTimer = () => {  
  status.value = 2
  clearInterval(timer)
}

// 當按下ＮＥＸＴ鍵時 目前狀態的值是0停止時 ----------------------------------------
const finishTimer = (skip) => {
  clearInterval(timer)
  status.value = 0
  finish()
  if(!skip) {
    const audio = new Audio()
    audio.src = selectedAlarmFile.value
    audio.play()
  }
  // 如果倒數完後還有東西的話就在跑一次startTimer()
  if (items.value.length > 0) {
    startTimer()
  }
}

// 當按下開始鍵時 ----------------------------------------
const startTimer = () => {
  // 目前狀態的值是0停止時且有項目，執行 this.current = this.items.shift()取陣列第一個值
  if (status.value === 0 && items.value.length > 0) {
    start()
  }
  // 目前正在處理項目，而且狀態的值是1倒數時
  if (current.value.length > 0) {
    status.value = 1
    timer = setInterval(() => {
      countdown()
      if (timeleft.value === 0) {
        finishTimer(false)
      }
    }, 1000)
  }
}

</script>






<style>
.o {
  width: 300px;
  height: 300px;
  border-radius: 100%;
  background-color: red;
  margin: auto;
  margin-top: 5%;
}
</style>
