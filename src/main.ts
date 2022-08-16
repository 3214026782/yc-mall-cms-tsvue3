import { createApp } from 'vue'
import { globalregister } from './global/index'
import 'normalize.css'
import './assets/css/index.less'

import App from './App.vue'

import router from './router'
import store from './store'
import { setupStore } from './store'

const app = createApp(App)

// 注册element-plus
app.use(globalregister)
app.use(store)
//刷新时从vuex从localStorage重新取值
setupStore()
// 先注册route路由再去匹配
app.use(router)

app.mount('#app')
