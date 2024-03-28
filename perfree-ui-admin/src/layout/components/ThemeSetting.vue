<template>
  <el-drawer
    v-model="themeSettingOpen"
    direction="rtl"
    size="350px"
    z-index="99"
    class="themeSettingBox"
  >
    <template #header>
      <span class="theme-header">主题配置</span>
    </template>
    <template #default>
      <el-divider>主题样式</el-divider>
      <div class="theme-style-box">
        <el-radio-group v-model="themeStyle" @change="changeTheme">
          <div class="theme-style" @click="selectTheme('default')">
            <el-container class="theme-box t-default">
              <el-aside></el-aside>
              <el-container>
                <el-header></el-header>
                <el-main></el-main>
              </el-container>
            </el-container>
            <el-radio :value="'default'">默认</el-radio>
          </div>
          <div class="theme-style" @click="selectTheme('light')">
            <el-container class="theme-box t-light">
              <el-aside width="30px"></el-aside>
              <el-container>
                <el-header></el-header>
                <el-main></el-main>
              </el-container>
            </el-container>
            <el-radio :value="'light'">白色</el-radio>
          </div>

          <div class="theme-style" @click="selectTheme('purple')">
            <el-container class="theme-box t-purple">
              <el-aside width="30px"></el-aside>
              <el-container>
                <el-header></el-header>
                <el-main></el-main>
              </el-container>
            </el-container>
            <el-radio :value="'purple'">骚紫</el-radio>
          </div>
        </el-radio-group>
      </div>

      <div>
        <span>顶栏通色</span>
        <el-switch v-model="value2" />
      </div>
    </template>
    <template #footer>
      <el-button @click="cancelThemeSetting">重置主题</el-button>
      <el-button type="primary" class="saveTheme">保存配置</el-button>
    </template>
  </el-drawer>
</template>

<script setup>
let themeSettingOpen = ref(false)
let themeStyle = ref('3')

const changeTheme = (x) => {
  document.getElementsByTagName('body')[0].setAttribute('class', 'theme-' + x)
}

// 打开主题设置
const openThemeSetting = () => {
  themeSettingOpen.value = true
}

// 关闭主题设置
const cancelThemeSetting = () => {
  themeSettingOpen.value = false
}

const selectTheme = (val) => {
  themeStyle.value = val
  changeTheme(val)
}

// 暴露方法
defineExpose({
  openThemeSetting,
})
</script>

<style lang="scss" scoped>
.theme-header {
  color: var(--el-text-color-primary);
}
.saveTheme {
  margin-left: auto;
}
.theme-style-box {
  display: flex;
  flex-wrap: wrap;
}
.theme-style {
  width: 90px;
  height: 110px;
  text-align: center;
  margin: 5px;
  cursor: pointer;
  .theme-box {
    box-shadow: var(--el-box-shadow-light);
    border-radius: 5px;
    overflow: hidden;
    width: 90px;
    height: 70px;
    .el-aside {
      width: 30px;
      height: 70px;
    }
    .el-header {
      height: 15px;
      padding: 0;
    }
    .el-main {
      background-color: var(--el-color-info-light-9);
    }
  }
}
.t-default {
  .el-aside {
    background-color: #001428;
  }
}
.t-light {
  .el-aside {
    background-color: var(--el-bg-color);
  }
}
.t-purple {
  .el-aside {
    background-color: #302b63;
  }
}
</style>
