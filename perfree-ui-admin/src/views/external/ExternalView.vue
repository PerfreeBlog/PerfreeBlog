<template>
  <div class="page">
    <micro-app name='my-app' :url="url" :iframe="route.meta.url.startsWith('http')" router-mode='state'></micro-app>
  </div>
</template>
<script setup>
const route = useRoute()
console.log(route.meta.url.startsWith('http'))
const url = route.meta.url.startsWith('http') ? route.meta.url : window.location.origin + route.meta.url
</script>