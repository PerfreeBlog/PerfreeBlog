import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'animate.css/animate.min.css'
import 'nprogress/nprogress.css'
import  "./index.css"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons' //同一个图标的其他系列
import { fab } from '@fortawesome/free-brands-svg-icons'
import piniaPersist from 'pinia-plugin-persist'
import axios from "./api/axios";
import VueDOMPurifyHTML from 'vue-dompurify-html'

const app = createApp(App);

// router
app.use(router)

// ElementPlus
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// pina
const pinia = createPinia()
pinia.use(piniaPersist)
app.use(pinia)

//FontAwesomeIcon
library.add(fas, far, fab)
app.component('font-awesome-icon', FontAwesomeIcon)

// VueDOMPurifyHTML
app.use(VueDOMPurifyHTML)

// axios
window.axios = axios;

app.mount('#app')