import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import DeviceHistory from '../views/History.vue'
import Loginpage from '../views/Loginpage.vue'
import Registerpage from '../views/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/history',
    name: 'History',
    component: DeviceHistory
  },
  {
    path: '/loginpage',
    name: 'Loginpage',
    component: Loginpage
  },
  {
    path: '/registerpage',
    name: 'Registerpage',
    component: Registerpage
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
