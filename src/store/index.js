import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  getters: {
    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    user_auth({ commit }, payload) {
      if (payload) {
        commit("SET_USER", {
          email: payload.email,
          displayName: payload.displayName,
        });
      } else {
        commit("SET_USER", null);
      }
    },
  },
});
