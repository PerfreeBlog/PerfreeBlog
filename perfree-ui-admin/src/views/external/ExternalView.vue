<template>
  <div class="page">
    <micro-app name='my-app' :url='url' iframe></micro-app>
  </div>
</template>
<script setup>
const route = useRoute()
const url = route.meta.url
</script>