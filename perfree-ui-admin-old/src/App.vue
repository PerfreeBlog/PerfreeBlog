<template>
  <RouterView />
</template>

<script setup>
import { useAppStore } from '@/stores/appStore'
import { themeSettings } from '@/theme'

const appStore = useAppStore()
if (appStore.headerUnified === null) {
  appStore.setHeaderUnified(themeSettings.headerUnified)
  appStore.setTheme(themeSettings.theme)
  appStore.setPrimaryColor(themeSettings.primaryColor)
  appStore.setTabOpen(themeSettings.tabOpen)
  appStore.setRouteAnimation(themeSettings.routeAnimation)
}
</script>

<style scoped></style>
