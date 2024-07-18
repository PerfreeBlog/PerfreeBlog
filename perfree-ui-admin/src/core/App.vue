<template>
  <router-view></router-view>
</template>

<script setup>
import { useAppStore } from '@/core/stores/appStore'
import { themeSettings } from '@/core/theme'

const appStore = useAppStore()
if (appStore.headerUnified === null) {
  appStore.setHeaderUnified(themeSettings.headerUnified)
  appStore.setTheme(themeSettings.theme)
  appStore.setPrimaryColor(themeSettings.primaryColor)
  appStore.setTabOpen(themeSettings.tabOpen)
  appStore.setRouteAnimation(themeSettings.routeAnimation)
}
</script>