<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-menu
            active-text-color="var(--el-color-primary)"  background-color="var(--el-bg-color)" class="side-menu"
            text-color="var(--el-text-color-primary)" :default-active="currRouter" router :collapse="menuIsCollapse" :collapse-transition="false"
        >
          <menu-tree :menu-list="menuList"></menu-tree>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <RouterView></RouterView>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import MenuTree from "@/layout/components/MenuTree.vue";
import {menus} from "@/data/menu.js";

const router = useRouter();
let currRouter = ref(router.currentRoute.value.path);
const menuList = menus;
let menuIsCollapse = ref(false)
function handleOpen(key, keyPath) {
  console.log(key, keyPath)
}

function handleClose(key, keyPath) {
  console.log(key, keyPath)
}
</script>

<style scoped>
.side-menu{
  height: 100%;
}
</style>
