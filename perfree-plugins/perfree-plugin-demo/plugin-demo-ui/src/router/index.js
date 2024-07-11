import {createRouter, createWebHistory} from "vue-router";
import DemoView from "../views/demo/DemoView.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.DEV ? import.meta.env.BASE_URL : '/plugin/perfree-demo/'),
    routes: [
        {
            path: '/',
            name: 'layout',
            redirect: 'demo',
        },
        {
            path: '/demo',
            name: 'demo',
            component: DemoView,
        },
        {
            path: '/demo/2',
            name: 'demo2',
            component: DemoView,
        }
    ],
})
export default router