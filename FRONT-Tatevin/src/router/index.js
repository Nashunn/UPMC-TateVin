import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Sandbox from '@/components/Sandbox'
import UserAccount from '@/components/UserAccount'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import WinesPage from '@/components/WinesPage'
import WineStories from '@/components/WineStories'
import Story from '@/components/Story'
import Learning from '@/components/Learning'
import Dictionnary from '@/components/Dictionnary'
import Search from '@/components/Search'
import Cave from '@/components/Cave'
import Wishes from '@/components/Wishes'

import BarcodeScan from '@/components/Scanner/BarcodeScan'

Vue.use(Router);

export default new Router({
<<<<<<< HEAD
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/sandbox',
      name: 'Sandbox',
      component: Sandbox
    },
    // User
    {
      path: '/user',
      name: 'UserAccount',
      component: UserAccount
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/wines',
      name: 'WinesPage',
      component: WinesPage
    },
    {
      path: '/wineStories',
      name: 'WineStories',
      component: WineStories
    },
    {
      path: '/story/:id',
      name: 'Story',
      component: Story
    },
    {
      path: '/learning',
      name: 'Learning',
      component: Learning
    },
    {
      path: '/dictionnary',
      name: 'Dictionnary',
      component: Dictionnary
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
=======
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Hello',
            component: Hello
        },
        {
            path: '/sandbox',
            name: 'Sandbox',
            component: Sandbox
        },
        // User
        {
            path: '/user',
            name: 'UserAccount',
            component: UserAccount
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/signup',
            name: 'Signup',
            component: Signup
        },
        {
            path: '/wines',
            name: 'WinesPage',
            component: WinesPage
        },
        {
            path: '/wineStories',
            name: 'WineStories',
            component: WineStories
        },
        {
            path: '/learning',
            name: 'Learning',
            component: Learning
        },
        {
            path: '/dictionnary',
            name: 'Dictionnary',
            component: Dictionnary
        },
        {
            path: '/search',
            name: 'Search',
            component: Search
>>>>>>> 6075ac54400f86c7c622e9bf47c32f4e322b562b

        },
        {
            path: '/cave',
            name: 'Cave',
            component: Cave
        },
        {
            path: '/wishes',
            name: 'Wishes',
            component: Wishes
        }
    ]
})
