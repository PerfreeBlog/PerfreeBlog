import './assets/main.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'animate.css/animate.min.css'
import 'nprogress/nprogress.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons' //同一个图标的其他系列
import { fab } from '@fortawesome/free-brands-svg-icons'
import piniaPersist from 'pinia-plugin-persist'
import axios from "./api/axios";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import FcDesigner from '@form-create/designer'
import formCreate from '@form-create/element-ui'
import install from '@form-create/element-ui/auto-import'
import ElementPlus from 'element-plus'
import microApp from '@micro-zoe/micro-app'
import App from './App.vue'
import router from './router'
import en from "@/language/en.js";
import zh from "@/language/zh.js";
import {createI18n} from "vue-i18n";
import VueDOMPurifyHTML from 'vue-dompurify-html'
import AttachSelectInput from "@/components/attach-select-input.vue";

window.axios = axios;
const app = createApp(App)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

const pinia = createPinia()

const i18n = createI18n({
    legacy: false,  // 设置为 false，启用 composition API 模式
    messages: {
        'zh': zh,
        'en': en
    },
    locale: 'zh'
    // TODO 国际化
    // locale: localStorage.getItem(CONSTANTS.STORAGE_LANGUAGE) ? localStorage.getItem(CONSTANTS.STORAGE_LANGUAGE) : 'zh'  // 设置默认语言
})

pinia.use(piniaPersist)
app.use(pinia)
app.config.globalProperties.$router = router;
app.use(router)

FcDesigner.component('AttachSelectInput', AttachSelectInput);
formCreate.use(install)
app.use(formCreate)
app.use(FcDesigner)
app.use(i18n)
library.add(fas, far, fab)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(VueDOMPurifyHTML)
microApp.router.setBaseAppRouter(router)
microApp.start({
})
app.mount('#app')