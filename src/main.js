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
  Col
} from 'ant-design-vue'

Vue.use(Button)
Vue.use(Form)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)

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
