import Vue from 'vue';
import Vuex from 'vuex';
import axios from '@/axios';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loggedInUser: null,
    eventsSearchQuery: '',
  },
  mutations: {
    SET_LOGGED_IN_USER(state, user) {
      state.loggedInUser = user;
    },
    SET_EVENTS_SEARCH_QUERY(state, searchQuery) {
      state.eventsSearchQuery = searchQuery.trim();
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
    getAllEvents({ commit, state }) {
      return new Promise((resolve, reject) => {
        axios.get(`events?search=${state.eventsSearchQuery}`)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            commit('SET_EVENTS_SEARCH_QUERY', '');
            reject(err);
          });
      });
    },
  },
});

export default store;
