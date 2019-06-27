import Vue from 'vue'
import Router from 'vue-router'
const AllTasks = () => import('@/pages/task/AllTasks')
const AllTasksPC = () => import('@/pages/task/AllTasksPC')
const AnswerQuestionnaire = () => import('@/pages/questionaire/AnswerQuestionnaire')
const Questionnaires = () => import('@/pages/questionaire/Questionnaires')
const QuestionairePC = () => import('@/pages/questionaire/QuestionairePC')
const Home = () => import('@/pages/home/Home')
const Register = () => import('@/pages/register/Register')
const Login = () => import('@/pages/login/Login')
const User = () => import('@/pages/user/User')
const Task = () => import('@/pages/task/Task')
const Finish = () => import('@/pages/finish/Finish')
const Questionaire = () => import('@/pages/questionaire/Questionaire')
const CreateTask = () => import('@/pages/createTask/CreateTask')
const PublishedQuestionnaire = () => import('@/pages/publishedQuestionnaire/Questionnaire')
const Settings = () => import('@/pages/Settings/Settings')
const PublishedTask = () => import('@/pages/publishedTask/PublishedTask')

Vue.use(Router)

export function createRouter () {
  const router = new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'Home',
        redirect: '/questionnaires',
        component: Home,
        children: [
          {
            path: 'questionnaires',
            name: 'questionnaires',
            component: Questionnaires
          },
          {
            path: 'tasks',
            name: 'AllTasks',
            component: AllTasks
          },
          {
            path: 'tasksPC',
            name: 'AllTasksPC',
            component: AllTasksPC,
            beforeEnter: (to, from, next) => {
              if (router.isPC) {
                next()
              } else {
                next('/tasks')
              }
            }
          }
        ]
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
        meta: { requiresAuth: true },
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
          },
          {
            path: 'questionnaire',
            name: 'PublishedQuestionnaire',
            component: PublishedQuestionnaire
          },
          {
            path: 'publichedtask',
            name: 'PublichedTask',
            component: PublishedTask
          }
        ]
      },
      {
        path: '/questionnaire',
        name: 'questionnaire',
        component: Questionaire,
        meta: { requiresAuth: true },
        beforeEnter: (to, from, next) => {
          if (!router.isPC) {
            next()
          } else {
            next('/questionnairePC')
          }
        }
      },
      {
        path: '/questionnairePC',
        name: 'questionnairePC',
        component: QuestionairePC,
        meta: { requiresAuth: true },
        beforeEnter: (to, from, next) => {
          if (router.isPC) {
            next()
          } else {
            next('/createQuestionnaire')
          }
        }
      },
      {
        path: '/createTask',
        name: 'CreateTask',
        meta: { requiresAuth: true },
        component: CreateTask
      },
      {
        path: '/questionnaire/:id',
        name: 'AnswerQuestionnaire',
        meta: { requiresAuth: true },
        component: AnswerQuestionnaire
      },
      {
        path: '/user/settings',
        name: 'Settings',
        meta: { requiresAuth: true },
        component: Settings
      },
      {
        path: '*',
        redirect: '/'
      }
    ]
  })

  // 路由鉴权
  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      console.log(sessionStorage.getItem('token'))
      if (!sessionStorage || !sessionStorage.getItem('token')) {
        next('/login')
        // router
        //   .app
        //   .$store
        //   .dispatch('login')
        //   .then(() => {
        //     next()
        //   })
        //   .catch(() => {
        //     next('/login')
        //   })
      } else {
        next()
      }
    } else {
      next()
    }
  })

  return router
}
