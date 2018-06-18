import Vue from 'vue'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import Hello from '@/components/Hello'
import Sandbox from '@/components/Sandbox'

Vue.use(Router);
Vue.use(BootstrapVue);


export default new Router({
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
    }
  ]
})
