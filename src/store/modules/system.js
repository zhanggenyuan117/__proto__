export default {
  namespaced: true,
  state: () => ({
    path: ''
  }),
  mutations: {
    setPath(state, payload) {
      state.path = payload;
    }
  },
  actions: {
    setPath({ commit }, payload) {
      commit('setPath', payload);
    }
  },
  getters: {
    path: state => state.path
  }
};