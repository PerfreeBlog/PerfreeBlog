import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/home/HomeView.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.DEV ? import.meta.env.BASE_URL : '/plugin/perfree-demo/'),
    routes: [
        {
            path: '/',
            name: 'demo',
            redirect: "home"
        },
        {
            path: '/home',
            name: 'home',
            component: HomeView,
        },
    ],
})
export default router