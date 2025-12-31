<template>
  <template v-for="menu in props.menuList">
    <template v-if="menu.children && menu.children.length > 0">
      <el-sub-menu :index="menu.id" class="menu-item">
        <template #title>
          <el-icon v-if="menu.icon" class="menu-icon" :style="{ color: getIconColor(menu.id) }">
            <font-awesome-icon :icon="menu.icon" />
          </el-icon>
          <span>{{ menu.name }}</span>
        </template>
        <menuTree :menuList="menu.children"></menuTree>
      </el-sub-menu>
    </template>
    <template v-else>
      <el-menu-item :index="menu.isFrame === 0 ? '/admin/frame/' + menu.id : menu.url" class="menu-item"  @click="clickMenu(menu)">
        <el-icon v-if="menu.icon" class="menu-icon" :style="{ color: getIconColor(menu.id) }">
          <font-awesome-icon :icon="menu.icon" />
        </el-icon>
        <template #title>{{ menu.name }}</template>
      </el-menu-item>
    </template>
  </template>
</template>
<script setup>
import {useRouter} from "vue-router";
import {toPage} from "@/core/utils/tabs.js";

const router = useRouter();
const props = defineProps(['menuList'])

const iconColors = [
  '#667eea',
  '#f5576c',
  '#4facfe',
  '#43e97b',
  '#fa709a',
  '#a18cd1',
  '#ff9a9e',
  '#fcb69f',
  '#66a6ff',
  '#6f86d6',
  '#f093fb',
  '#48c6ef',
]

const colorCache = new Map()

function getIconColor(menuId) {
  if (colorCache.has(menuId)) {
    return colorCache.get(menuId)
  }
  const hash = String(menuId).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const color = iconColors[hash % iconColors.length]
  colorCache.set(menuId, color)
  return color
}

function clickMenu(menu) {
  if (menu.isFrame === 0) {
    if (menu.target === 1) {
      window.open(menu.url, '_blank');
    } else {
      toPage(menu.name, '/admin/frame/' + menu.id, '')
    }
  } else {
    router.replace(menu.url);
  }
}
</script>

<style scoped>
.menu-icon {
  font-size: 14px !important;
}

.menu-item {
  margin-top: 6px;
  border-radius: 8px;
}

:deep(.el-sub-menu__title) {
  border-radius: 8px;
}
</style>
