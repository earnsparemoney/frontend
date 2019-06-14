import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('@/pages/home/Home')
const Register = () => import('@/pages/register/Register')
const Login = () => import('@/pages/login/Login')

Vue.use(Router)

export function createRouter () {
  return new Router({
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
}
