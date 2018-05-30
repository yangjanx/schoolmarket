import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import HomeFirst from '@/components/HomeFirst'
import Cart from '@/components/Cart'
import Login from '@/components/Login'
import Publish from '@/components/Publish'
import Shop from '@/components/Shop'
import Shopitem from '@/components/Shopitem'
import Usercenter from '@/components/Usercenter'
import Shoplist from '@/components/Shoplist'
import Personalprofile from '@/components/Personalprofile'
import Modifypsd from '@/components/Modifypsd'
import Collection from '@/components/Collection'
import Mypublication from '@/components/Mypublication'

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
      redirect:'/shoplist',
      children:[
        {path:'/shoplist',component:Shoplist},
        {path:'/shopitem',component:Shopitem}
      ]
    },
    {
      path: '/usercenter',
      component: Usercenter,
      redirect:'/personalprofile',
      children:[
        {path:'/personalprofile',component:Personalprofile},
        {path:'/modifypsd',component:Modifypsd},
        {path:'/collection',component:Collection},
        {path:'/mypublication',component:Mypublication}
      ],
      meta:{auth:true} //设置当前路由需要校验
    },
    {
      path: '/publish',
      component: Publish,
      meta:{auth:true} //设置当前路由需要校验
    },
    {
      path: '/cart',
      component: Cart,
      meta:{auth:true} //设置当前路由需要校验
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
