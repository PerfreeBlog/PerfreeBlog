<template>
  <div class="page">
    <iframe :src="'https://perfree.org.cn/'"
            width="100%"
            height="100%"
            frameborder="0"
            class="frame"
            > </iframe>
  </div>
</template>

<script setup>
const route = useRoute()
const url = route.meta.url

</script>

<style scoped>
.page{
  height: 100%;
}
.frame{
  box-shadow: var(--el-box-shadow-light);
}
</style>