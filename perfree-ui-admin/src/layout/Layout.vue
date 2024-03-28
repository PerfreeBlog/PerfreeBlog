<template>
  <div :class="classObject">
    <el-container class="fullMaxHeight">
      <Sider :menu-is-collapse="menuIsCollapse"></Sider>
      <el-container>
        <Header @menu-collapse="handleMenuCollapse"></Header>
        <el-main class="p-main">
          <RouterView></RouterView>
        </el-main>
        <el-footer @click="btn">Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Sider from '@/layout/components/Sider.vue'
import Header from '@/layout/components/Header.vue'

document.getElementsByTagName('body')[0].setAttribute('class', 'theme-default')
const classObject = ref({
  commonLayout: true,
  fullMaxHeight: true,
})

let menuIsCollapse = ref(false)
function handleMenuCollapse(value) {
  menuIsCollapse.value = value
}
</script>

<style scoped>
.p-main {
  background-color: var(--el-color-info-light-9);
}
</style>
