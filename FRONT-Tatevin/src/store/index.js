
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
            state.usr.aVote=[];
        },
        updateSubs: (state, subs) => {
            state.usr.subscription = subs;
        },
        incrementSubs:(state, subToAdd) => {
            state.usr.subscription.push(subToAdd);
        },
        destroyUser: (state) => {
            state.usr = {};
        },
        aVote:(state, id_comment)=>{
            state.usr.aVote.push(id_comment);
        },
        addCave:(state, id_cave)=>{
            state.usr.cave=id_cave;
        }

    }
});
export default store
