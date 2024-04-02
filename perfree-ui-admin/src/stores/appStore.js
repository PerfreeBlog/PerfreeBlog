import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    navTabs: [],
    // 主题
    theme: null,
    // 主题色
    primaryColor: null,
    // 顶栏通色
    headerUnified: null,
    // 是否开启tab栏
    tabOpen: null,
  }),
  getters: {
    getNavTabs() {
      return this.navTabs
    },
    getTheme() {
      return this.theme
    },
    getPrimaryColor() {
      return this.primaryColor
    },
    getHeaderUnified() {
      return this.headerUnified
    },
    getTabOpen() {
      return this.tabOpen
    },
  },
  actions: {
    setNavTabs(val) {
      this.navTabs = val
    },
    setTheme(val) {
      this.theme = val
    },
    setPrimaryColor(val) {
      this.primaryColor = val
    },
    setHeaderUnified(val) {
      this.headerUnified = val
    },
    setTabOpen(val) {
      this.tabOpen = val
    },
  },
  persist: {
    enabled: true, //开启本地存储
  },
})
