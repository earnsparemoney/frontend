import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import Clipboard from 'clipboard'
import axios from 'axios'
import VueAxios from 'vue-axios'

import {
  Alert,
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
  Select
} from 'ant-design-vue'

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

Vue.prototype.message = message
Vue.prototype.Clipboard = Clipboard
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<App/>'
})

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/serviceWorker.js').then(registration => {
      console.log('SW registered: ', registration)
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError)
    })
  })
}
