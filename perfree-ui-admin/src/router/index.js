import {createRouter, createWebHistory} from 'vue-router'
import Layout from '@/layout/Layout.vue'
import NProgress from 'nprogress'
import {CONSTANTS} from "@/utils/constants.js";
import LoginView from "@/views/login/LoginView.vue";
import {useCommonStore} from "@/stores/commonStore.js";
import {getAllOption, menuAdminList, userInfo} from "@/api/system.js";
import {useOptionStore} from "@/stores/optionStore.js";
const modules = import.meta.glob('../views/**/*.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      redirect: 'admin',
      children: [
        {
          path: '/admin/codegen/editConfig/:id',
          name: 'editConfig',
          component: () => import('@/views/codegen/CodegenEditConfig.vue'),
          meta: {
            title: "修改代码生成配置",
            keepAlive: false
          }
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    }
  ],
})

router.afterEach(() => {
  NProgress.done() // 进度条结束
})


// 路由守卫
router.beforeEach((to, from, next) => {
  const commonStore = useCommonStore()
  const optionStore = useOptionStore()
  NProgress.start();
  let token_info = localStorage.getItem(CONSTANTS.STORAGE_TOKEN);
  if (token_info) {
    token_info = JSON.parse(token_info);
  }
  // 判断是否登录
  if (!token_info || !token_info.accessToken || token_info.accessToken === '') {
    if (to.path === '/login') {
      next();
      return;
    }
    next('/login');
  } else {
    if (commonStore.menuInit) {
      next();
    } else {
      initMenu().then(() => {
        Promise.all([genRouteByMenus(commonStore.menuList), getAllOption()]).then(([r, optionRes]) => {
          let options = {};
          optionRes.data.forEach(item => {
            options[item.key] = item;
          })
          optionStore.setOptions(optionRes)
          commonStore.setMenuInit(true);
          next({...to, replace: true});

        })
      })
    }
  }
})

const initMenu = () => {
  return new Promise((resolve, reject)=> {
    const commonStore = useCommonStore()
    menuAdminList().then((res) => {
      if (res.code === 200) {
        let menuList = res.data;
        menuList.unshift( {
          id: 'home',
          pid: -1,
          url: '/admin',
          name: '首页',
          componentName: 'home',
          component: '/home/HomeView',
          icon: 'fa-solid fa-house',
          children: [],
        });
        commonStore.setMenuList(menuList)
        resolve()
      }
    })
  })
}

const genRouteByMenus = (menus) => {
  return new Promise((resolve, reject)=> {
    const commonStore = useCommonStore()
    for (let item of menus) {
      if (item.children && item.children.length > 0) {
        genRouteByMenus(item.children).then(() => {})
      } else {
        if (item.url) {
          router.addRoute("layout",
              {
                path: item.url,
                name: item.componentName,
                component: modules[`../views${item.component}.vue`],
                meta: {
                  title: item.name,
                  keepAlive: true
                }
              }
          )
        }
      }
    }
    router.getRoutes().forEach(r => {
      if (r.meta.keepAlive) {
        commonStore.cachedViews.push(r)
      }
    })
    resolve()
  })
}
export default router
