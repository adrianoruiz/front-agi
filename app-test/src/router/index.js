import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'people',
    component: HomeView
  },
  {
    path: '/',
    name: 'planets',
    component: HomeView
  },
  {
    path: '/',
    name: 'starships',
    component: HomeView
  },
 
  {
    path: '/about',
    name: 'about',
   
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
