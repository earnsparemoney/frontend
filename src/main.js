import Vue from 'vue'
import router from './router'
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
