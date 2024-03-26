<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          default-active="2"
          text-color="#fff"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="2">
            <el-icon>
              <font-awesome-icon icon="fa-solid fa-clock" />
            </el-icon>
            <span>Navigator Two</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <el-icon><font-awesome-icon icon="fa-solid fa-clock" /></el-icon>
            <span>Navigator Three</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><font-awesome-icon icon="fa-solid fa-clock" /></el-icon>
            <span>Navigator Four</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <font-awesome-icon icon="fa-solid fa-clock" />
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
function handleOpen(key, keyPath) {
  console.log(key, keyPath)
}

function handleClose(key, keyPath) {
  console.log(key, keyPath)
}
</script>

<style lang="scss" scoped></style>
