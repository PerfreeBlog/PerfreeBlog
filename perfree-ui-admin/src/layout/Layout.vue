<template>
  <el-config-provider :locale="locale">
    <div :class="classObject">
      <el-container class="fullMaxHeight">
        <Sider :menu-is-collapse="menuIsCollapse"></Sider>
        <el-container>
          <Header
            @menu-collapse="handleMenuCollapse"
            :class="{ headerBoxShadow: !appStore.tabOpen }"
          ></Header>
          <el-main class="p-main">
            <div class="header-tab" v-if="appStore.tabOpen">
              <span class="tab-left-btn" @click="scrollToLeft">
                <font-awesome-icon icon="fa-solid fa-angle-left " />
              </span>
              <div class="h-tab-box" ref="scrollbarRef">
                <ul class="header-tab-ul" ref="innerRef">
                  <li
                    :class="{ 'header-tab-item': true, active: tab.currActive }"
                    v-for="tab in tabs"
                    :key="tab.path"
                    @click="clickTabHandle(tab)"
                  >
                    <span class="tab-item-name">{{ tab.name }}</span>
                    <span
                      class="tab-item-btn"
                      v-if="tab.hasClose"
                      @click="closeTabHandle(tab.path, $event)"
                    >
                      <font-awesome-icon icon="fa-solid fa-xmark " />
                    </span>
                  </li>
                </ul>
              </div>
              <span class="tab-right-btn" @click="scrollToRight">
                <font-awesome-icon icon="fa-solid fa-angle-right " />
              </span>
            </div>
            <div class="p-page">
              <RouterView v-slot="{ Component }" v-if="!appStore.refreshRouteflag">
                <transition
                    name="fade"
                    mode="out-in"
                    :enter-active-class="'animate__animated ' + appStore.routeAnimation"
                >
                  <keep-alive :include="cachedViews">
                    <component :is="Component" :key="Component.key" />
                  </keep-alive>
                </transition>
              </RouterView>
            </div>
          </el-main>
          <el-footer class="footer">
            <span>Copyright © 2018-2024  All Rights Reserved. </span>
          </el-footer>
        </el-container>
      </el-container>
    </div>
  </el-config-provider>
</template>

<script setup>
import Sider from '@/layout/components/Sider.vue'
import Header from '@/layout/components/Header.vue'
import { useAppStore } from '@/stores/appStore'
import { ElConfigProvider } from 'element-plus'
import { useCssVar } from '@vueuse/core'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import {tabsData} from "@/utils/tabs.js";
import {useCommonStore} from "@/stores/commonStore.js";

const appStore = useAppStore()
const route = useRoute()
const router = useRouter()
const scrollbarRef = ref()
const innerRef = ref()
const el = ref(null)
const color = useCssVar('--el-color-primary', el)
const primaryColor3 = useCssVar('--el-color-primary-light-3', el)
const primaryColor5 = useCssVar('--el-color-primary-light-5', el)
const primaryColor7 = useCssVar('--el-color-primary-light-7', el)
const primaryColor8 = useCssVar('--el-color-primary-light-8', el)
const primaryColor9 = useCssVar('--el-color-primary-light-9', el)
const primaryColor2 = useCssVar('--el-color-primary-dark-2', el)
const commonStore = useCommonStore()
let cachedViews = ref(commonStore.cachedViews)
let locale = ref(zhCn)
let menuIsCollapse = ref(false)
let tabs = reactive(tabsData)

const classObject = ref({
  commonLayout: true,
  fullMaxHeight: true,
})

watch(route, () => {
  console.log('route变化', route)
  handleAddTab(route)
})

const handleAddTab = (route) => {
  let index = tabs.findIndex((tab) => tab.path === route.fullPath)
  if (index < 0) {
    tabs.forEach((tab) => {
      tab.currActive = false
    })
    const tabInfo = {
      name: route.meta.title,
      hasClose: true,
      path: route.fullPath,
      currActive: true,
    }
    tabs.push(tabInfo)
    appStore.setActiveTab(tabInfo)
  } else {
    tabs.forEach((tab) => {
      tab.currActive = tab.path === route.fullPath
      if (tab.path === route.fullPath) {
        appStore.setActiveTab(tab)
      }
    })
  }
}
// 处理菜单收缩
const handleMenuCollapse = (value) => {
  menuIsCollapse.value = value
}

// tab栏向左滚动
const scrollToLeft = () => {
  scrollbarRef.value.style.scrollBehavior = 'smooth'
  scrollbarRef.value.scrollLeft -= 200
}

// tab栏向右滚动
const scrollToRight = () => {
  scrollbarRef.value.style.scrollBehavior = 'smooth'
  scrollbarRef.value.scrollLeft += 200
}

// 点击tab
const clickTabHandle = (val) => {
  tabs.forEach((tab) => {
    tab.currActive = tab.path === val.path
  })
  router.push(val.path)
}

// 关闭tab
const closeTabHandle = (path, event) => {
  let indexToDelete = tabs.findIndex((tab) => tab.path === path)
  if (tabs[indexToDelete].currActive) {
    tabs.splice(indexToDelete, 1)
    indexToDelete = indexToDelete - 1
    router.push(tabs[indexToDelete].path)
  } else {
    tabs.splice(indexToDelete, 1)
  }
  event.stopPropagation()
}

// 初始化主题
const initTheme = () => {
  document.getElementsByTagName('body')[0].setAttribute('class', 'theme-' + appStore.theme)
}

// 初始化主题色
const initPrimaryColor = () => {
  let val = appStore.primaryColor
  color.value = val
  primaryColor3.value = val + 80
  primaryColor5.value = val
  primaryColor7.value = val
  primaryColor8.value = val
  primaryColor9.value = val + 10
  primaryColor2.value = val
}

function initTabs() {
  if (appStore.activeTab) {
    tabs.push(appStore.activeTab)
  }
  handleAddTab(route)
}

initPrimaryColor()
initTheme()
initTabs()
</script>

<style scoped>
.p-main {
  background-color: var(--el-fill-color-lighter);
  overflow-x: hidden;
  padding: 0;
  margin: 0;
}
.p-page {
  padding: 15px;
  height: calc(100% - 70px);
  overflow: auto;
  background-color: var(--el-bg-color);
}
.p-page::-webkit-scrollbar {
  width: 8px;
}
.p-page::-webkit-scrollbar-thumb {
  background-color: var(--el-color-info-light-3);
  border-radius: 10px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}
.p-page::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: var(--el-color-info-light-7);
}
.headerBoxShadow {
  box-shadow: 0 1px 4px #00152914;
  border-bottom: none !important;
}
.header-tab {
  height: 40px;
  background: var(--el-bg-color);
  box-shadow: 0 1px 4px #00152914;
  position: relative;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  z-index: 9;
  user-select: none;
  .h-tab-box {
    margin-left: 30px;
    width: calc(100% - 60px);
    height: 40px;
    overflow: hidden;
  }
  .tab-left-btn,
  .tab-right-btn {
    top: 0;
    position: absolute;
    display: block;
    height: 30px;
    line-height: 30px;
    width: 30px;
    text-align: center;
    background-color: var(--el-bg-color);
    cursor: pointer;
    margin-top: 5px;
  }
  .tab-left-btn {
    left: 0px;
  }
  .tab-right-btn {
    right: 0;
  }
  .tab-left-btn:hover,
  .tab-right-btn:hover {
    color: var(--el-color-primary);
  }
  :deep().el-scrollbar__wrap {
    scroll-behavior: smooth;
  }

  .header-tab-ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    height: 40px;
    line-height: 40px;
    background-color: var(--el-bg-color);
    align-items: center;
    white-space: nowrap;
    .header-tab-item {
      padding-left: 15px;
      padding-right: 8px;
      font-size: 14px;
      color: var(--el-text-color-regular);
      cursor: pointer;
      background-color: var(--el-border-color-extra-light);
      height: 25px;
      line-height: 25px;
      margin-right: 10px;
      border-radius: 5px;
      .tab-item-btn {
        display: inline-block;
        font-size: 14px;
        width: 0;
        opacity: 0;
        transition: opacity 0.3s ease;
        transition: width 0.3s ease;
      }
      .tab-item-name {
        padding-right: 7px;
      }
      .tab-item-btn:hover {
        color: var(--el-color-primary);
      }
    }
    .header-tab-item.active {
      background-color: var(--el-color-primary-light-9);
      color: var(--el-color-primary);
    }
    .header-tab-item:hover {
      background-color: var(--el-color-primary-light-9);
      .tab-item-btn {
        width: 20px;
        text-align: center;
        opacity: 1;
      }
    }
  }
}
.footer{
  text-align: center;
  line-height: 50px;
  height: 51px;
  border-top: solid 1px var(--el-border-color-lighter);
  color: var(--el-color-info);
  font-size: 14px;
}
</style>
