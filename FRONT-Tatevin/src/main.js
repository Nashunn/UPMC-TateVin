// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import './styles/style.css';
import './styles/fonts.css';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex)
Vue.config.productionTip = false;
Vue.use(BootstrapVue);

import vuexI18n from 'vuex-i18n';
const storeTranslation = new Vuex.Store();
import {fr} from './assets/i18n/languages/fr'
import {en} from './assets/i18n/languages/en'
Vue.use(vuexI18n.plugin, storeTranslation);
Vue.i18n.add('fr', fr);
Vue.i18n.add('en', en);

Vue.i18n.set(navigator.language.substr(0,2))


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
    store,
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});
