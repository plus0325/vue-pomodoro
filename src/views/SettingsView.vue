<template lang="pug">
v-row#settings
  v-col(cols="12")
    h1.text-center 設定
  v-col(cols="12")
    | (給你看一下響應) v-radio 選到的鈴聲 id {{ selectedAlarm }}
    v-table
      thead
        tr
          th 名稱
          th 試聽
          th 選擇
      tbody
        tr(v-for="alarm in alarms")
          td {{ alarm.name }}
          td 
            audio(controls :src="alarm.file")
          td
            //- 如果不用解構響應的方式要這樣寫 
              v-radio(v-model="settings.selectedAlarm" :value="alarm.id")
              >>> const { selectedAlarm } = storeToRefs(settings) 這斷就可以不用寫了(下方)
            v-radio(v-model="selectedAlarm" :value="alarm.id")
</template>

<!-- script setup ------------------------------------------------------------------------------------------------ -->
<script setup>
// import { reactive } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import { storeToRefs } from 'pinia'

// 控制選擇鬧鐘資料的部分(pinia)-> src/stores/seeting.js
// Pinia解構方法：storeToRefs (這樣才能響應式修改值，原本單純用ES6來解構是無法的 const { selectedAlarm } = settings )
const settings = useSettingsStore()
// const { selectedAlarm } = storeToRefs(settings)
const { selectedAlarm, alarms } = storeToRefs(settings)









// 鬧鐘資料抓取的部分 reactive 反應式 ------------------------------------------------------------------------------
// const alarms = reactive([
//   { 
//     id: 1,
//     name: 'Alarm',
//     // 引用資源（Ch.23 Vite 與單元件檔案）
//     file: new URL('../assets/alarm.mp3', import.meta.url).href
//   },
//   { 
//     id: 2,
//     name: 'Yay',
//     file: new URL('../assets/yay.mp3', import.meta.url).href
//   }
  
// ])
// import { reactive } from 'vue' (這原本在上面的就不需要了)
// -------------------------------------------------------------------------------之後老師把這部分搬到/stores/settings
</script>





<!-- 
  


<template>
  <v-row id="settings">

    <v-col cols="12">
      <h1 class="text-center">設定</h1>
    </v-col>

    <v-col cols="12">
      <v-table>
        <thead>
          <tr>
            <th>名稱</th>
            <th>試聽</th>
            <th>選擇</th>
          </tr>
        </thead>
      </v-table>
    </v-col>
    
  </v-row>
</template>



-->