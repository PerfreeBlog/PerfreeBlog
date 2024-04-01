<template>
  <el-aside :class="{ sider: true, fullMaxHeight: true, collapseSider: menuIsCollapse }">
    <div class="logoBox">
      <img src="@/assets/logo.png" class="logo-img" />
      <h2 :class="{ logoTitle: true, logoHide: menuIsCollapse }">Perfree</h2>
    </div>
    <el-menu
      class="side-menu"
      router
      :default-active="currMenuIndex"
      :collapse="menuIsCollapse"
      @select="handleOpen"
      popper-class="poper-menu"
      :collapse-transition="false"
    >
      <menu-tree :menu-list="menuList"></menu-tree>
    </el-menu>
  </el-aside>
</template>

<script setup>
import MenuTree from '@/layout/components/MenuTree.vue'
import { menus } from '@/data/menu.js'
import { useAppStore } from '@/stores/appStore.js'

const props = defineProps(['menuIsCollapse'])
const route = useRoute()
const appStore = useAppStore()
let currMenuIndex = ref(appStore.currMenu ? appStore.currMenu : '1')
const menuList = menus

watch(route, () => {
  console.log(route.meta.id)
  currMenuIndex.value = route.meta.id
  appStore.setCurrMenu(route.meta.id)
})

const handleOpen = (key, keyPath, item) => {
  appStore.setCurrMenu(key)
}
</script>

<style lang="scss" scoped>
.sider {
  box-shadow: 2px 0 8px #1d23290d;
  position: relative;
  z-index: 10;
  width: 240px;
  transition: all 0.2s;
  overflow-x: hidden;
  background-color: var(--sider-bg-color);
  color: var(--sider-text-color);
  transition: all 0.2s;
  :deep().side-menu {
    background-color: var(--sider-bg-color);
    transition: all 0.2s;
    .el-menu-item {
      color: var(--sider-text-color);
    }
  }
  :deep().el-sub-menu,
  :deep().el-menu-item,
  :deep().el-menu {
    background-color: var(--sider-bg-color);
    transition: all 0.2s;
  }

  :deep().el-menu-item:hover {
    background-color: var(--sider-menu-hover-bg-color);
  }
  :deep() .el-sub-menu__title:hover {
    background-color: var(--sider-menu-hover-bg-color);
  }
  :deep().el-menu-item.is-active {
    transition: all 0.2s;
    background-color: var(--sider-menu-active-bg-color) !important;
  }
  :deep().is-opened {
    transition: all 0.2s;
    background-color: var(--sider-menu-open-color);
  }
  :deep().el-sub-menu__title {
    transition: all 0.2s;
    color: var(--sider-text-color);
  }
}

.collapseSider {
  width: 60px;
  .side-menu {
    padding: 0;
  }
}

.side-menu {
  border: none;
  padding-left: 10px;
  padding-right: 10px;
}

.logoBox {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  line-height: 60px;
  overflow: hidden;
  white-space: nowrap;
}
.logo-img {
  width: auto;
  height: 32px;
}
.logoTitle {
  display: inline-block;
  font-size: 18px;
  font-weight: 600;
  height: 32px;
  line-height: 32px;
  margin-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: all 0.3s;
}
.logoHide {
  display: none;
}
</style>
