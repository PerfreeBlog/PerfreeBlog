import {defineStore} from "pinia";

export const useAppStore = defineStore({
    id: 'app',
    state: () => ({
        currMenu: "",
    }),
    getters: {
        getCurrMenu() {
            return this.currMenu;
        },
    },
    actions: {
        setCurrMenu(val) {
            try {
                this.currMenu = val;
            } catch (error) {}
        },
    },
    persist: {
        enabled: true,//开启存储
    }
})