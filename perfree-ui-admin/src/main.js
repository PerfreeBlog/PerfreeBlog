import './assets/main.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'animate.css/animate.min.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons' //同一个图标的其他系列
import { fab } from '@fortawesome/free-brands-svg-icons'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
library.add(fas, far, fab)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
