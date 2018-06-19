// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex)

Vue.config.productionTip = false;

const store = new Vuex.Store({
    state: {
        cart: [],
        usr: {}
    },
    plugins: [createPersistedState()],
    mutations: {
        addCart: (state, card) => {
            var bool = false;
            state.cart.forEach(element => {
                if(element.id === card.id) bool = true;
            });
            if(bool === false)
                state.cart.push(card)
        },
        removeCart: (state, card) => {
            state.cart = state.cart.filter( (el) => { return el.id !== card.id });
        },
        instanceUser: (state, usr) => {
            state.usr = usr;
        },
        destroyUser: (state) => {
            state.usr = {};
            state.cart = {};
        }

    }
});

/* eslint-disable no-new */

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/static/sw.js').then(function(registration) {
    console.log('ServiceWorker registration successful!');
  }).catch(function(err) {
    console.log('ServiceWorker registration failed: ', err);
  });
}

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});

