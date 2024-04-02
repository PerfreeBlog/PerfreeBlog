import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/Layout.vue'
import NProgress from 'nprogress'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      redirect: 'home',
      children: [
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
          path: '/home',
          name: 'home',
          component: () => import('../views/HomeView.vue'),
          meta: {
            title: '首页',
          },
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  NProgress.start() // 进度条开始
  next()
})

router.afterEach(() => {
  NProgress.done() // 进度条结束
})

export default router
