import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入element plus
import ElementPlus from 'element-plus'
//引入elementplus的 css
import 'element-plus/dist/index.css'
//引入自己的css样式
import '@/style/tree.css'
import '@/style/btn.css'
import '@/style/table.css'
import '@/style/dialog.css'
//引入配置好的axios
import axios from '@/plugins/axiosInstance.js'

const app = createApp(App)
app.use(ElementPlus).use(store).use(router).mount('#app')
app.config.globalProperties.$axios=axios;//配置axios的全局引用