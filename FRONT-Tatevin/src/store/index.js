
import Vue from 'vue'
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        usr: {}
    },
    plugins: [createPersistedState()],
    mutations: {
        instanceUser: (state, usr) => {
            state.usr = usr;
        },
        updateSubs: (state, subs) => {
            state.usr.subscription = subs;
        },
        incrementSubs:(state, subToAdd) => {
            state.usr.subscription.push(subToAdd);
        },
        destroyUser: (state) => {
            state.usr = {};
        }

    }
});
export default store