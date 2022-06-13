import Vue from 'vue'
import VueRouter from 'vue-router'
import SlamView from '../views/SlamView.vue'
import NavigationView from '../views/NavigationView.vue'
import ProgramView from '../views/ProgramView.vue'
import SettingView from '../views/SettingView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'slam',
    component: SlamView
  },
  {
    path: '/navigation',
    name: 'navigation',
    component: NavigationView
  },
  {
    path: '/program',
    name: 'program',
    component: ProgramView
  },
  {
    path: '/setting',
    name: 'setting',
    component: SettingView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
