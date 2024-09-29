<template>
  <el-aside :class="{ sider: true, fullMaxHeight: true, collapseSider: menuIsCollapse }">
    <div class="logoBox">
      <img :src="WEB_LOGO && WEB_LOGO.value ? WEB_LOGO.value : '/assets/logo.png'" class="logo-img" />
      <h2 :class="{ logoTitle: true, logoHide: menuIsCollapse }">{{WEB_NAME? WEB_NAME.value: 'Perfree'}}</h2>
    </div>
    <el-menu
      class="side-menu"
      :default-active="currRouter"
      :collapse="menuIsCollapse"
      popper-class="poper-menu"
      :collapse-transition="false"
      :unique-opened="true"
    >
      <menu-tree :menu-list="menuList"></menu-tree>
    </el-menu>
    <div :class="{'small-screen-menu-btn': true, 'show': !menuIsCollapse}" @click="emits('update:menuIsCollapse', true)">
      <font-awesome-icon icon="fa-solid fa-outdent" />
    </div>
  </el-aside>
</template>

<script setup>
import MenuTree from '@/core/layout/components/MenuTree.vue'
import {useCommonStore} from "@/core/stores/commonStore.js";
import {useRoute, useRouter} from "vue-router";
import {ref, watch} from "vue";
import {getOptionByKey} from "@/core/utils/optionUtils.js";

const commonStore = useCommonStore()
const router = useRouter()
const route = useRoute()
const props = defineProps(['menuIsCollapse'])
const emits = defineEmits(['update:menuIsCollapse'])
let currRouter = ref(router.currentRoute.value.path)
let menuList = ref(commonStore.menuList)
const WEB_NAME = getOptionByKey('WEB_NAME', 'system_setting');
const WEB_LOGO = getOptionByKey('WEB_LOGO', 'system_setting');
watch(route, () => {
  currRouter.value = route.fullPath
})

// 监听 menuList 变化
watch(
  () => commonStore.menuList,
  (newMenuList, oldMenuList) => {
    menuList.value = newMenuList;
  },
  { deep: true }
)
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
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard syntax */
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
    color: var(--sider-text-active-color);
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
.small-screen-menu-btn{
  position: fixed;
  left: -240px;
  width: 35px;
  height: 70px;
  top: calc(50% - 70px);
  background: white;
  text-align: center;
  line-height: 70px;
  z-index: 9999999;
  box-shadow: 3px 0px 3px 0px rgb(0 21 41 / 8%);
  border-radius: 0 15px 15px 0;
  transition: all 0.2s;
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
    height: calc(100% - 60px);
    overflow-x: auto;
}

.side-menu::-webkit-scrollbar {
  width: 0;
}

.side-menu::-webkit-scrollbar {
  height: 0;
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
@media screen and (max-width:700px) {
  .collapseSider{
    width: 0;
  }
  .sider{
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999999;
  }
  .small-screen-menu-btn.show{
    left: 240px;
  }
}
</style>
