import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/Layout.vue'
import NProgress from 'nprogress'
import {CONSTANTS} from "@/utils/constants.js";
import LoginView from "@/views/login/LoginView.vue";

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
          path: '/menu',
          name: 'menu',
          component: () => import('../views/menu/MenuView.vue'),
          meta: {
            title: '菜单管理',
          },
        },
        {
          path: '/role',
          name: 'role',
          component: () => import('../views/role/RoleView.vue'),
          meta: {
            title: '角色管理',
          },
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('../views/AboutView.vue'),
          meta: {
            title: '关于',
          },
        },
        {
          path: '/about2',
          name: 'about2',
          component: () => import('../views/AboutView2.vue'),
          meta: {
            title: '子菜单',
          },
        },
        {
          path: '/about3',
          name: 'about3',
          component: () => import('../views/AboutView3.vue'),
          meta: {
            title: '子菜单2',
          },
        },
        {
          path: '/admin',
          name: 'home',
          component: () => import('../views/HomeView.vue'),
          meta: {
            title: '首页',
          },
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
  }
  else {
    next();
  }
})

export default router
