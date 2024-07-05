<template>
  <div class="page">
    <div>
      <h2>这里是主应用</h2>
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger" @click="xxx">Danger</el-button>
    </div>
    <div>
      <h2>这里是子应用</h2>
    <micro-app name='my-app' url='http://localhost:4201/admin/plugin/demo' iframe></micro-app>
    </div>
  </div>
</template>
<script setup>
const route = useRoute()
const url = route.meta.url
</script>