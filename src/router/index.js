import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'




Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/classify',
    name: 'Classify',
    component: () => import(/* webpackChunkName: "about" */ '../views/Classify.vue'),
    props:true
  },
  {
    path: '/bookrack',
    name: 'BookRack',
    component: () => import(/* webpackChunkName: "about" */ '../views/BookRack.vue'),
    props:true
  },
  {
    path: '/details',
    name: 'Details',
    component: () => import(/* webpackChunkName: "about" */ '../views/Details.vue'),
    props:true
  },
  {
    path: '/fiction',
    name: 'Fiction',
    component: () => import(/* webpackChunkName: "about" */ '../views/Fiction.vue'),
    props:true
  },
  {
    path: '/rankingList',
    name: 'RankingList',
    component: () => import(/* webpackChunkName: "about" */ '../views/RankingList.vue'),
    props:true
  }
  

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
