import Vue from 'vue'
import { createRouter } from './router'
import store from './store'
import App from './App.vue'

import {
  Button,
  Form,
  Input,
  Icon,
  Row,
  Col,
  Dropdown,
  Menu
} from 'ant-design-vue'

Vue.use(Button)
Vue.use(Form)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Dropdown)
Vue.use(Menu)

Vue.config.productionTip = false

export function createApp () {
  const router = createRouter()
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router }
}
