// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'

//Styles
import './styles/style.css';
import './styles/menu.css';
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
import store from './store/'


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
