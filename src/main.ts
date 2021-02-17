import { createApp } from 'vue'

import App from './App.vue'
import './index.css'
import router from './route/newRouter'
import Login from "../src/components/login.vue"

//引入 element-plus
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import { HttpService } from './api/http';



const app = createApp(App)
app.config.globalProperties.$httpService = new HttpService
app.use(ElementPlus)
app.use(router)
app.mount('#app')

