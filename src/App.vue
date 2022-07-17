<template lang="pug">
v-app
  //- bar區 -----------------------------------------
  v-app-bar(color="#1B5E20")
    v-btn(icon to='/' color="#DD2C00").mr-n5
      v-icon mdi-home-circle
    //- 首頁標題
    v-app-bar-title#title POmOdORO
    v-spacer
    //- 回首頁icon
    v-btn(icon to='/' color="#76FF03")
      v-icon mdi-timer
    //- 項目狀態icon
    v-btn(icon to='/list' color="#76FF03")
      v-icon mdi-format-list-bulleted
    //- 設定icon
    v-btn(icon to='/settings' color="#76FF03")
      v-icon mdi-cog
    //- 允許通知切換icon(預設是關閉)
    v-btn(icon v-if="notify" @click="toggleNotify" color="#76FF03")
      v-icon mdi-bell
    v-btn(icon v-else @click="toggleNotify" color="#76FF03")
      v-icon mdi-bell-off

  //- 內容區 -----------------------------------------
  v-main
    v-container
      router-view(v-slot="{ Component }")
        keep-alive(include="HomeView")
          component(:is="Component")
          //- 暫存元件（網頁) https://ithelp.ithome.com.tw/articles/10271305
          //- 為了切換頁面的時候原本的頁面會有所連動(緩存頁面) keep-alive
</template>



<!-- 
v-app-bar-title (bar標題)
v-spacer (空隙)
v-main
v-icon
v-btn
-->
<script setup>
// 將放在stores/list.js設定的 notify ＋ toggleNotify 匯入讓通知按鈕可以用
import { storeToRefs } from 'pinia'
import { useListStore } from '@/stores/list'
const list = useListStore()
const { notify } = storeToRefs(list)
const { toggleNotify } = list
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Engagement&display=swap');

 #title {
    font-size: 40px;
    font-family: 'Engagement', cursive;
    color: #76FF03;
  }
  v-main {
    background-color: #AB47BC;
  }
</style>










<!--  
<template>



<v-app>
    <v-app-bar color="primary">
        <v-app-bar-title>POmOdORO</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn icon="icon" to="/">
            <v-icon>mdi-timer</v-icon>
        </v-btn>
        <v-btn icon="icon" to="/list">
            <v-icon>mdi-format-list-bulleted</v-icon>
        </v-btn>
        <v-btn icon="icon" to="settings">
            <v-icon>mdi-cog</v-icon>
        </v-btn>
    </v-app-bar>
</v-app>




</template>s
-->



