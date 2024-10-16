import { defineStore } from 'pinia'

export const useCommonStore = defineStore({
    id: 'common',
    state: () => ({
        menuInit: false,
        optionInit: false,
        menuList: [],
        cachedViews: []
    }),
    getters: {
        getMenuInit() {
            return this.menuInit
        },
        getOptionInit() {
            return this.optionInit
        },

        getMenuList() {
            return this.menuList
        },
        getCachedViews() {
            return this.cachedViews
        },
    },
    actions: {
        setMenuInit(val) {
            this.menuInit = val
        },
        setOptionInit(val) {
            this.optionInit = val
        },
        setMenuList(val) {
            this.menuList = val
        },
        setCachedViews(val) {
            this.cachedViews = val
        },
    },
    persist: {
        enabled: false,
    },
})
