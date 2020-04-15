import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from '../views/Landing.vue'
import Home from '../views/Home.vue'
import AddItemForm from '../components/AddItemForm.vue'
import Dashboard from '../components/Dashboard.vue'
import Detail from '../components/Detail.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/addItemForm',
        component: AddItemForm,
        name: 'AddItemForm'
      },
      {
        path: '/dashboard',
        component: Dashboard,
        name: 'Dashboard'
      },
      {
        path: '/detail/:id',
        component: Detail,
        name: 'Detail'
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('access_token')
    if (token) {
      next()
    } else {
      next({
        path: '/'
      })
    }
  } else {
    next()
  }
})

export default router
