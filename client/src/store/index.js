import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

const vuexPersist = new VuexPersist({
  key: "vuex",
  storage: window.localStorage,
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isSidebar: true,
    signInCode: null,
    userToken: null,
    myCompanyToken: null,
    authorityId: null,
  },
  mutations: {
    toggleSidebar(state) {
      state.isSidebar = !state.isSidebar;
    },
    setSignInCode(state, code) {
      state.signInCode = code;
    },
    setUserToken(state, token) {
      state.userToken = token;
    },
    clearAuth(state, token) {
      state.userToken = null;
      state.myCompanyToken = null;
      state.signInCode = null;
    },

    setAuthorityId(state, authority) {
      state.authorityId = authority;
    },
    setMyCompany(state, myCompany) {
      state.myCompanyToken = myCompany;
    },
  },
  actions: {
    saveSignInCode({ commit }, code) {
      commit("setSignInCode", code);
    },
    saveFounderToken({ commit }, token) {
      commit("setUserToken", token);
    },
    saveAuthorityId({ commit }, authority) {
      commit("setAuthorityId", authority);
    },
    clearAuth({ commit }) {
      commit("clearAuth");
    },
    saveMyCompany({ commit }, myCompany) {
      commit("setMyCompany", myCompany);
    },
  },
  getters: {
    getSignInCode(state) {
      return state.signInCode;
    },
    getFounderToken(state) {
      return state.userToken;
    },
    getAuthorityId(state) {
      return state.authorityId;
    },
    getMyCompany(state) {
      return state.myCompanyToken;
    },
  },
  plugins: [vuexPersist.plugin],
});
