import Vue from 'vue'
import VueRouter from 'vue-router'
//import SlamView from '../views/SlamView.vue'
//import NavigationView from '../views/NavigationView.vue'
import HomeView from '../views/HomeView.vue'
import ProgramView from '../views/ProgramView.vue'
//import SettingView from '../views/SettingView.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/program',
        name: 'program',
        component: ProgramView
    },
    
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router