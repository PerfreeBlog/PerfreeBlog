<template>
  <el-config-provider :locale="locale">
    <div :class="classObject">
      <el-container class="fullMaxHeight">
        <Sider :menu-is-collapse="menuIsCollapse"></Sider>
        <el-container>
          <Header @menu-collapse="handleMenuCollapse"></Header>
          <el-main class="p-main">
            <div class="header-tab">
              <span class="tab-left-btn" @click="scrollToLeft">
                <font-awesome-icon icon="fa-solid fa-angle-left " />
              </span>
              <div class="h-tab-box" ref="scrollbarRef">
                <ul class="header-tab-ul" ref="innerRef">
                  <li
                    :class="{ 'header-tab-item': true, active: tab.currActive }"
                    v-for="tab in tabs"
                    :key="tab.id"
                    @click="clickTabHandle(tab)"
                  >
                    <span class="tab-item-name">{{ tab.name }}</span>
                    <span class="tab-item-btn" v-if="tab.hasClose" @click="closeTabHandle(tab.id)">
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
          <el-footer>Footer</el-footer>
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
const route = useRoute()
const router = useRouter()
const scrollbarRef = ref()
const innerRef = ref()
let locale = ref(zhCn)
let menuIsCollapse = ref(false)
let tabs = reactive([
  { id: '1', name: '首页', hasClose: false, path: '/home', currActive: true },
  { id: '2', name: '角色管理', hasClose: true, path: '/about', currActive: false },
  { id: '4', name: '用户管理', hasClose: true, path: '/about2', currActive: false },
  { id: '5', name: 'xx管理', hasClose: true, path: '/about3', currActive: false },
])

const classObject = ref({
  commonLayout: true,
  fullMaxHeight: true,
})

document.getElementsByTagName('body')[0].setAttribute('class', 'theme-default')

watch(route, () => {
  console.log(route.meta.id)
  tabs.forEach((tab) => {
    tab.currActive = tab.id === route.meta.id
  })
})

const handleMenuCollapse = (value) => {
  menuIsCollapse.value = value
}

const scrollToLeft = () => {
  scrollbarRef.value.style.scrollBehavior = 'smooth'
  scrollbarRef.value.scrollLeft -= 200
}

const scrollToRight = () => {
  scrollbarRef.value.style.scrollBehavior = 'smooth'
  scrollbarRef.value.scrollLeft += 200
}

// 点击tab
const clickTabHandle = (val) => {
  tabs.forEach((tab) => {
    tab.currActive = tab.id === val.id
  })
  router.replace(val.path)
}

// 关闭tab
const closeTabHandle = (id) => {
  let indexToDelete = tabs.findIndex((tab) => tab.id === id)
  if (tabs[indexToDelete].currActive) {
    tabs.splice(indexToDelete, 1)
    indexToDelete = indexToDelete - 1
    console.log(tabs[indexToDelete].path)
    router.replace(tabs[indexToDelete].path)
  } else {
    tabs.splice(indexToDelete, 1)
  }
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
  position: relative;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
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
    background-color: white;
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
</style>
