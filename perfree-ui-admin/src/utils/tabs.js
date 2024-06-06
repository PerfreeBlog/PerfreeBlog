import router from "@/router/index.js";

export let tabsData = [{ name: '首页', hasClose: false, path: '/admin', currActive: true }]
export function toPage(name, path, params) {
    let index = tabsData.findIndex((tab) => tab.path === path)
    if (index < 0) {
        tabsData.push({
            name: name, hasClose: true, path: path, currActive: false
        });
    }
    router.push({
        path: path,
        query: params
    })
}

export function closeTab(path) {
    let index = tabsData.findIndex((tab) => tab.path === path)
    if (index >= 0) {
        tabsData.splice(index, 1)
    }
}