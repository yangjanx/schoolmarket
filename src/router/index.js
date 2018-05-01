import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import HomeFirst from '@/components/HomeFirst'
import Cart from '@/components/Cart'
import Login from '@/components/Login'
import Publish from '@/components/Publish'
import Searchresult from '@/components/Searchresult'
import Shop from '@/components/Shop'
import Shopitem from '@/components/Shopitem'
import Usercenter from '@/components/Usercenter'
import Shoplist from '@/components/Shoplist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      component: Home,
      children: [
        { path: '/', component: HomeFirst }
      ]
    },
    {
      path: '/shop',
      component: Shop,
      children:[
        {path:'/',component:Shoplist}
      ]
    },
    {
      path: '/searchresult',
      component: Searchresult
    },
    {
      path: '/shopitem',
      component: Shopitem
    },
    {
      path: '/usercenter',
      component: Usercenter
    },
    {
      path: '/publish',
      component: Publish
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/*',
      redirect: '/home'
    }
  ]
})
