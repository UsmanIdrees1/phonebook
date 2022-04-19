import Vue from "vue";
import Vuex from "vuex";
import { getAuth, signOut } from "firebase/auth";
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
          uid: payload.uid,
        });
      } else {
        commit("SET_USER", null);
      }
    },
    signOut() {
      const auth = getAuth();
      return signOut(auth);
    },
    register({ commit, dispatch }) {
      dispatch("signOut");
      commit("SET_USER", null);
    },
  },
});
