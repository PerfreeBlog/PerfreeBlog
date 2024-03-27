<template>
  <div class="common-layout fullMaxHeight">
    <el-container class="fullMaxHeight">
      <Sider :menu-is-collapse="menuIsCollapse"></Sider>
      <el-container>
        <Header @menu-collapse="handleMenuCollapse"></Header>
        <el-main>
          <RouterView></RouterView>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Sider from '@/layout/components/Sider.vue'
import Header from '@/layout/components/Header.vue'

let menuIsCollapse = ref(false)
function handleMenuCollapse(value) {
  menuIsCollapse.value = value
}
</script>

<style scoped></style>
