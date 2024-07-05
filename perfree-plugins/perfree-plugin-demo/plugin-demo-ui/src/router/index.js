import {createRouter, createWebHistory} from "vue-router";
import DemoView from "../views/demo/DemoView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/admin/plugin/demo',
            name: 'demo',
            component: DemoView,
        }
    ],
})
export default router