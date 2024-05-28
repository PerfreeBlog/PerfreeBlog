import { defineStore } from 'pinia'

export const useCommonStore = defineStore({
    id: 'common',
    state: () => ({
        menuInit: false,
        menuList: [],
    }),
    getters: {
        getMenuInit() {
            return this.menuInit
        },

        getMenuList() {
            return this.menuList
        },
    },
    actions: {
        setMenuInit(val) {
            this.menuInit = val
        },
        setMenuList(val) {
            this.menuList = val
        },
    },
    persist: {
        enabled: false,
    },
})
