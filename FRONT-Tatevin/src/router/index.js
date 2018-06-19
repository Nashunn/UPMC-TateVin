import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Sandbox from '@/components/Sandbox'
import UserAccount from '@/components/UserAccount'
import Login from '@/components/Login'
import Signup from '@/components/Signup'

import Scanner from '@/components/Scanner/BarcodeScan'

Vue.use(Router);

export default new Router({
<<<<<<< HEAD
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
    {
      path: '/scan',
      component: Scanner
    },

  ]
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
        }
    ]
>>>>>>> ac2b9dd6b6c3248f9bf3ee6ea72e1a55a93ec196
})
