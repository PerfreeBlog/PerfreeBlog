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
import AttachSelectInput from "@/core/components/attach/attach-select-input.vue";
import FcDesigner from '@form-create/designer'
import formCreate from '@form-create/element-ui'
import install from '@form-create/element-ui/auto-import'
import {hasPermission} from "@/core/directive/permission/hasPermission.js";
import download from "@/core/utils/download.js";
import {useOptionStore} from "@/core/stores/optionStore.js";
import {AttachSelectInputRule} from "@/core/components/attach/AttachSelectInput.js";
import {getOptionByKeysAndIdentificationApi} from "@/core/api/option.js";
import SettingCarousel from "@/core/components/setting-carousel/setting-carousel.vue";
import {SettingCarouselRule} from "@/core/components/setting-carousel/SettingCarousel.js";

const app = createApp(App);

// custom directive
app.directive('hasPermission', hasPermission)

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



// form-create
FcDesigner.component('AttachSelectInput', AttachSelectInput);
FcDesigner.component('SettingCarousel', SettingCarousel);
formCreate.use(install)
formCreate.register(AttachSelectInputRule);
formCreate.register(SettingCarouselRule);

app.component('AttachSelectInput', AttachSelectInput);
app.component('SettingCarousel', SettingCarousel);
app.use(formCreate)
app.use(FcDesigner)
app.use(FcDesigner.formCreate)
// 定义全局
window.router = router;
window.axios = axios;
window.pinia = pinia;
window.download = download;


// 加载系统需要的配置信息
const optionStore = useOptionStore()
getOptionByKeysAndIdentificationApi(['WEB_TITLE', 'WEB_ICO', 'WEB_NAME', 'WEB_LOGO', 'WEB_IS_REGISTER', 'WEB_OPEN_CAPTCHA'], 'system_setting').then(res => {
    optionStore.setOptions(res.data);
    app.mount('#app')
}).catch(e => {
    app.mount('#app')
})
