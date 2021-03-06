import Vue from 'vue'
import App from './App.vue'
import Clipboard from 'clipboard'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from '@/components/loading'
import { RecycleScroller } from 'vue-virtual-scroller'
import { createRouter } from './router'
import { createStore } from './store'

import {
  Alert,
  Modal,
  Button,
  Form,
  Input,
  InputNumber,
  Icon,
  Row,
  Col,
  Dropdown,
  Menu,
  Card,
  Avatar,
  Divider,
  message,
  Radio,
  Rate,
  Select,
  DatePicker,
  Breadcrumb,
  Checkbox,
  Spin
} from 'ant-design-vue'

Vue.use(Breadcrumb)
Vue.use(Select)
Vue.use(Alert)
Vue.use(Button)
Vue.use(Form)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Dropdown)
Vue.use(Menu)
Vue.use(Card)
Vue.use(Avatar)
Vue.use(Divider)
Vue.use(Radio)
Vue.use(Rate)
Vue.use(InputNumber)
Vue.use(DatePicker)
Vue.use(Modal)
Vue.use(Checkbox)
Vue.use(Spin)
Vue.use(Loading)

Vue.prototype.message = message
Vue.prototype.Clipboard = Clipboard
Vue.use(VueAxios, axios)
Vue.component('RecycleScroller', RecycleScroller)

Vue.config.productionTip = false
Vue.config.devtools = true

if (process.env.NODE_ENV === 'development') {
  Vue.config.devtools = true
} else {
  Vue.config.devtools = false
}

/* eslint-disable no-new */

export function createApp () {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
