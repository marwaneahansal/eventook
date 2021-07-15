import Vue from 'vue';
import Vuex from 'vuex';
import axios from '@/axios';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loggedInUser: null,
  },
  mutations: {
    SET_LOGGED_IN_USER(state, user) {
      state.loggedInUser = user;
    },
  },
  actions: {
    getLoggedInuser({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('users/user')
          .then((res) => {
            if (res.data.user) {
              commit('SET_LOGGED_IN_USER', res.data.user);
              resolve(res);
            } else {
              commit('SET_LOGGED_IN_USER', null);
              reject(res);
            }
          })
          .catch((err) => {
            commit('SET_LOGGED_IN_USER', null);
            reject(err);
          });
      });
    },
  },
});

export default store;
