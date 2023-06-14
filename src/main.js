import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { ElLoading } from 'element-plus'
const app = createApp(App)
axios.defaults.baseURL = 'http://localhost:3000'
app.config.globalProperties.$http = axios
    // 声明请求拦截器
let loadingInstance = null
axios.interceptors.request.use(config => {
    // 展示loading效果
    loadingInstance = ElLoading.service({ fullscreen: true })
    return config
})

// 声明相应拦截器
axios.interceptors.response.use(response => {
    // 影藏loading效果
    loadingInstance.close()
    return response
})


app.use(router)
app.use(ElementPlus)
app.mount('#app')