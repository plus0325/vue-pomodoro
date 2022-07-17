<template lang="pug">
v-row#list
  v-col(cols='12')
    h1 待辦事項
  v-col(cols='12')
    v-text-field(
      variant="underlined"
      v-model="newItem"
      append-icon="mdi-plus"
      :rules="[required]"
      @click:append="onInputSubmit"
      @keydown.enter="onInputSubmit"
    )
    v-table
      thead
        tr
          th 名稱
          th 操作
      tbody
        tr(v-if="items.length === 0")
          td.text-center(colspan="2") 沒有資料
        tr(v-for="(item, i) in items")
          td
            v-text-field(v-if="item.edit" v-model="item.model" autofocus)
            span(v-else) {{ item.name }}
          td
            span(v-if="item.edit")
              v-btn(icon variant="plain" flat color="orange" @click="confirmEdiItem(i)")
                v-icon mdi-check
              v-btn(icon variant="plain" flat color="red" @click="cancelEditItem(i)")
                v-icon mdi-undo
            span(v-else)
              v-btn(icon variant="plain" flat color="orange" @click="editItem(i)")
                v-icon mdi-pencil
              v-btn(icon variant="plain" flat color="red" @click="delItem(i)")
                v-icon mdi-delete
//- flat(移除按鈕框陰影)
//- variant="plain"(樣式為純色)
//- icon(將按鈕指定為圖標。按鈕將變為圓形並應用 text 道具)
//- autofocus（聚焦）
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useListStore } from '@/stores/list'

const newItem = ref('')
// 驗證-------------------------- required
const required = value => {
  // return !!value || '必填'
  return !!value
}

const list = useListStore()
// stores/list.js 的 data需要動態更新
const { items } = storeToRefs(list)
// stores/list.js 的 addItem是funtion不用動態更新(直接解構)
const { addItem, delItem, editItem, confirmEdiItem, cancelEditItem } = list

const onInputSubmit = () => {
  // 驗證-------------------------- required
  const valid = required(newItem.value)
  if (!valid) return
  // data = newItem.value
  addItem(newItem.value)
  newItem.value = ''
}

</script>


<style>
/* #list {
  background-color: #AB47BC;
} */
</style>