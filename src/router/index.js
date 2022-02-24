import Vue from 'vue'
import VueRouter from 'vue-router'
const Recommend = (resolve) => {
  import('../views/Recommend').then((moduleRecommend) => resolve(moduleRecommend))
}
const Singer = (resolve) => {
  import('../views/Singer').then((moduleSinger) => resolve(moduleSinger))
}
const Rank = (resolve) => {
  import('../views/Rank').then((moduleRank) => resolve(moduleRank))
}
const Search = (resolve) => {
  import('../views/Search').then((moduleSearch) => resolve(moduleSearch))
}
const Detail = (resolve) => {
  import('../views/Detail').then((moduleDetail) => resolve(moduleDetail))
}
const User = (resolve) => {
  import('../views/User').then((moduleUser) => resolve(moduleUser))
}

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: './recommend' },
  {
    path: '/recommend',
    component: Recommend,
    children: [{
      path: 'detail/:id/:type',
      component: Detail
    }]
  },
  { path: '/user', component: User },
  {
    path: '/singer',
    component: Singer,
    children: [{
      path: 'detail/:id/:type',
      component: Detail
    }]
  },
  {
    path: '/rank',
    component: Rank,
    children: [{
      path: 'detail/:id/:type',
      component: Detail
    }]
  },
  { path: '/search', component: Search }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
