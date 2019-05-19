import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import Register from '@/pages/register/Register'
import Login from '@/pages/login/Login'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

export default router
