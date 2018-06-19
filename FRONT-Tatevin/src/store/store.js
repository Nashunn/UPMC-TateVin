import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

const store = {
    state: {
        cart: [],
    },
    mutations: {
        increment () {
            state.count++;
        }
    },
    plugins: [vuexLocal.plugin]
}

export default store;
