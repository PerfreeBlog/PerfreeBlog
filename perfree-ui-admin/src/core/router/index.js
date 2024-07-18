
// 创建一个路由器实例
import {createRouter, createWebHistory} from "vue-router";
import Layout from "../layout/Layout.vue";
import NProgress from 'nprogress'
import {CONSTANTS} from "@/core/utils/constants.js";
import LoginView from "@/core/views/login/LoginView.vue";
import {useCommonStore} from "@/core/stores/commonStore.js";
import {menus} from "@/core/data/menuData.js";
import _import from "@/core/utils/_import.js";
import {getAllRouter, initMenu} from "@/core/utils/perfree.js";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'layout',
            component: Layout,
            redirect: 'admin',
            children: [
            ],
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        }
    ],
});

// router加载完毕
router.afterEach(() => {
    NProgress.done() // 进度条结束
})

// 路由守卫
router.beforeEach((to, from, next) => {
    const commonStore = useCommonStore()
    NProgress.start();

    // 获取本地token,判断是否存在
    let token_info = localStorage.getItem(CONSTANTS.STORAGE_TOKEN);
    if (token_info) {
        token_info = JSON.parse(token_info);
    }
    if (!token_info || !token_info.accessToken || token_info.accessToken === '') {
        if (to.path === '/login') {
            next();
            return;
        }
        next('/login');
    } else {
        // 如果已存在token,那么进行菜单的初始化及模块加载/路由添加操作
        if (commonStore.menuInit) {
            next();
            return;
        }
        initMenu().then(() => {
            let allRouter = [];
            getAllRouter(commonStore.menuList, allRouter);
            console.log(allRouter)
            Promise.all([genRoute(allRouter)]).then(([r]) => {
                commonStore.setMenuInit(true);
                next({...to, replace: true});
            })
        });
    }
});

// 生成路由
function genRoute(routes) {
    return new Promise(async (resolve, reject) => {
        const modules = routes.reduce((acc, menu) => {
            const componentPart = menu.moduleName;
            if (!acc[componentPart]) {
                acc[componentPart] = [];
            }
            acc[componentPart].push(menu);
            return acc;
        }, {});
        for (const moduleName in modules) {
            if (!moduleName) {
                continue
            }
            await _import("", moduleName).then(res => {
                let moduleRouter = res.router(modules[moduleName], moduleName);
                moduleRouter.forEach(r => {
                    router.addRoute("layout", r)
                })
            })
        }
        resolve()
    });
}


export default router;