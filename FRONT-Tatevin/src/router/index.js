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
import OtherUser from '@/components/OtherUser'
import Wine from '@/components/Wine/Wine'
import WineStoryCreation from '@/components/WineStoryCreation'

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
            path: '/user/:username',
            name: 'UserAccount',
            component: OtherUser
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
            path: '/wine/:id',
            name: 'Wine',
            component: Wine
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
            path: '/wineStories/creation',
            name: 'WineStoryCreation',
            component: WineStoryCreation
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
        },
        {
            path: "/user/:username",
            component: OtherUser,
            name: "otherUser"
        },

    ]
})
