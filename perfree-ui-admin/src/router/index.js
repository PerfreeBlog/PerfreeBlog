import {createRouter, createWebHistory} from 'vue-router'
import Layout from '@/layout/Layout.vue'
import NProgress from 'nprogress'
import {CONSTANTS} from "@/utils/constants.js";
import LoginView from "@/views/login/LoginView.vue";
import {useCommonStore} from "@/stores/commonStore.js";
import {menuAdminList} from "@/api/system.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      redirect: 'admin',
      children: [
     /*   {
          path: '/admin',
          name: 'home',
          component: () => import('../views/HomeView.vue'),
          meta: {
            title: '首页',
          },
        },*/
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
        genRouteByMenus(commonStore.menuList).then(() => {
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
    for (let item of menus) {
      if (item.children && item.children.length > 0) {
        genRouteByMenus(item.children).then(() => {})
      } else {
        if (item.url) {
          router.addRoute("layout",
              {
                path: item.url,
                name: item.componentName,
                component: () => import('../views' + item.component + '.vue'),
                meta: {
                  title: item.name,
                }
              }
          )
        }
      }
    }
    resolve()
  })
}
export default router
