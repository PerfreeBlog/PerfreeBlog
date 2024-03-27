<template>
  <template v-for="menu in props.menuList">
    <template v-if="menu.children && menu.children.length > 0">
      <el-sub-menu :index="menu.id" class="menu-item">
        <template #title>
          <el-icon v-if="menu.icon" class="menu-icon">
            <font-awesome-icon :icon="menu.icon" />
          </el-icon>
          <span>{{ menu.name }}</span>
        </template>
        <menuTree :menuList="menu.children"></menuTree>
      </el-sub-menu>
    </template>
    <template v-else>
      <el-menu-item :index="menu.path" class="menu-item">
        <el-icon v-if="menu.icon" class="menu-icon">
          <font-awesome-icon :icon="menu.icon" />
        </el-icon>
        <template #title>{{ menu.name }}</template>
      </el-menu-item>
    </template>
  </template>
</template>
<script setup>
const props = defineProps(['menuList'])
</script>

<style scoped>
.menu-icon {
  font-size: 14px;
}
.menu-item {
  margin-top: 6px;
  border-radius: 3px;
}
.el-menu-item.is-active {
  background-color: var(--el-color-primary-light-9) !important;
}
.is-opened {
  background-color: white;
}
.el-menu-item:hover {
  background-color: var(--el-bg-color-page);
}
:deep() .el-sub-menu__title:hover {
  background-color: var(--el-bg-color-page);
}
</style>
