import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Sandbox from '@/components/Sandbox'
import UserAccount from '@/components/UserAccount'
import Login from '@/components/Login'
import Signup from '@/components/Signup'

Vue.use(Router);

export default new Router({
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
})
