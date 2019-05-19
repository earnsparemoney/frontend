import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import { Button, Menu, Row, Col, Dropdown } from 'ant-design-vue'

Vue.use(Button)
Vue.use(Menu)
Vue.use(Row)
Vue.use(Col)
Vue.use(Dropdown)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
