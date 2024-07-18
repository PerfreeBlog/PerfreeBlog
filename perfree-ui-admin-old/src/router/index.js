import {createRouter, createWebHistory} from 'vue-router'
import Layout from '@/layout/Layout.vue'
import NProgress from 'nprogress'
import {CONSTANTS} from "@/utils/constants.js";
import LoginView from "@/views/login/LoginView.vue";
import {useCommonStore} from "@/stores/commonStore.js";
import {getAllOption, menuAdminList, userInfo} from "@/api/system.js";
import {useOptionStore} from "@/stores/optionStore.js";
import { initMenu } from "@/utils/perfree.js";
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

// router加载完毕
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
      let childRouter2 = [{
        componentName: "home",
        moduleName: "home",
        name: "home",
        path: "/homexxx",
        component: "/Home"
      }]
      let xxx = import(`http://127.0.0.1:8089/modules/home/home.js`);
      xxx.then(res => {
        console.log(res)
        let moduleRouter = res.default().router(childRouter2, "home");
        moduleRouter.forEach(r => {
          router.addRoute("layout", r)
        })
        console.log(router.getRoutes())
      })
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


// 根据菜单生成路由
const genRouteByMenus = (menus) => {
  return new Promise((resolve, reject)=> {
    const commonStore = useCommonStore()
    for (let item of menus) {
      if (item.children && item.children.length > 0) {
        genRouteByMenus(item.children).then(() => {})
      } else {
        if (item.url) {
          if (item.isFrame === 0) {
            router.addRoute("layout",
              {
                path: '/frame/' + item.id,
                name: item.componentName,
                component: modules[`../views/external/FrameView.vue`],
                meta: {
                  title: item.name,
                  keepAlive: true,
                  url: item.url
                }
              }
            )
          } else if (item.pluginId) {
            router.addRoute("layout",
                {
                  path: item.url,
                  name: item.componentName,
                  component: modules[`../views/external/ExternalView.vue`],
                  meta: {
                    title: item.name,
                    keepAlive: true,
                    url: item.component
                  }
                }
            )
          } else {
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
    }

    // 设置缓存的路由
    commonStore.setCachedViews([]);
    router.getRoutes().forEach(r => {
      if (r.meta.keepAlive) {
        commonStore.cachedViews.push(r)
      }
    })
    resolve()
  })
}
export default router
