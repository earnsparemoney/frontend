import Vue from 'vue'
import Router from 'vue-router'
import AllTasks from '../pages/task/AllTasks'
const QuestionairePC = () => import('../pages/questionaire/QuestionairePC')
const Home = () => import('@/pages/home/Home')
const Register = () => import('@/pages/register/Register')
const Login = () => import('@/pages/login/Login')
const User = () => import('@/pages/user/User')
const Task = () => import('@/pages/task/Task')
const Finish = () => import('@/pages/finish/Finish')
const Questionaire = () => import('@/pages/questionaire/Questionaire')
const Group = () => import('@/pages/group/Group')
const CreateTask = () => import('@/pages/createTask/CreateTask')

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
      path: '/user',
      redirect: '/user/task',
      name: 'User',
      component: User,
      children: [
        {
          path: 'task',
          name: 'Task',
          component: Task
        },
        {
          path: 'finish',
          name: 'Finish',
          component: Finish
        }
      ]
    },
    {
      path: '/questionaire',
      name: 'Questionaire',
      component: Questionaire
    },
    {
      path: '/group',
      name: 'Group',
      component: Group
    },
    {
      path: '/alltasks',
      name: 'AllTasks',
      component: AllTasks
    },
    {
      path: '/task',
      name: 'CreateTask',
      component: CreateTask
    },
    {
      path: '/questionairepc',
      name: 'Questionairepc',
      component: QuestionairePC
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

export default router
