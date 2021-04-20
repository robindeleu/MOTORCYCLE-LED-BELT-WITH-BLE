import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    BluetoothBelt:{}
  },
  mutations: {
    setDevice(state, BluetoothBelt) {
      state.BluetoothBelt = BluetoothBelt
    }
  },
  actions: {
    connect({commit},BluetoothBelt){
      console.log("Save device in store...", BluetoothBelt);
      commit("setDevice",BluetoothBelt);
    },
    disconnect({commit}){
      console.log("Delete device out off store...");
      commit("setDevice",{});
    },
  },
  getters: {
    getBluetoothBelt(state) {
      return state.BluetoothBelt;
    },
  },
  modules: {
  }
})
