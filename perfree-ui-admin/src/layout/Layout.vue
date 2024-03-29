<template>
  <el-config-provider :locale="locale">
    <div :class="classObject">
      <el-container class="fullMaxHeight">
        <Sider :menu-is-collapse="menuIsCollapse"></Sider>
        <el-container>
          <Header @menu-collapse="handleMenuCollapse"></Header>
          <el-main class="p-main">
            <div class="header-tab">
              <el-scrollbar>
                <ul class="header-tab-ul">
                  <li class="header-tab-item active">首页</li>
                  <li class="header-tab-item">角色管理</li>
                  <li class="header-tab-item">用户管理</li>
                </ul>
              </el-scrollbar>
            </div>
            <div class="p-page">
              <RouterView v-slot="{ Component }">
                <transition
                  name="fade"
                  mode="out-in"
                  enter-active-class="animate__animated animate__fadeIn"
                >
                  <component :is="Component" />
                </transition>
              </RouterView>
            </div>
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
  padding: 0;
  margin: 0;
}
.p-page {
  padding: 15px;
}
.header-tab {
  height: 40px;
  background: white;
  box-shadow: 0 1px 4px #00152914;
  .header-tab-ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    height: 40px;
    line-height: 40px;
    background-color: var(--el-bg-color);
    align-items: center;
    .header-tab-item {
      padding-left: 15px;
      padding-right: 15px;
      font-size: 14px;
      color: var(--el-text-color-regular);
      cursor: pointer;
      background-color: var(--el-border-color-extra-light);
      height: 25px;
      line-height: 25px;
      margin-left: 10px;
      border-radius: 5px;
    }
    .header-tab-item.active {
      background-color: var(--el-color-primary-light-9);
      color: var(--el-color-primary);
    }
    .header-tab-item:hover {
      background-color: var(--el-color-primary-light-9);
      color: var(--el-color-primary);
    }
  }
}
</style>
