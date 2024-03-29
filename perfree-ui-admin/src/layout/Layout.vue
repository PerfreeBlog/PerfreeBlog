<template>
  <el-config-provider :locale="locale">
    <div :class="classObject">
      <el-container class="fullMaxHeight">
        <Sider :menu-is-collapse="menuIsCollapse"></Sider>
        <el-container>
          <Header @menu-collapse="handleMenuCollapse"></Header>
          <el-main class="p-main">
            <RouterView v-slot="{ Component }">
              <transition
                name="fade"
                mode="out-in"
                enter-active-class="animate__animated animate__fadeIn"
              >
                <component :is="Component" />
              </transition>
            </RouterView>
          </el-main>
          <el-footer @click="btn">Footer</el-footer>
        </el-container>
      </el-container>
    </div>
  </el-config-provider>
</template>

<script setup>
import Sider from '@/layout/components/Sider.vue'
import Header from '@/layout/components/Header.vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

let locale = ref(zhCn)
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
  overflow-x: hidden;
}
</style>
