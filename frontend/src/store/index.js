import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    BluetoothBelt:{}
  },
  mutations: {
    addDevice(state, BluetoothBelt) {
      state.BluetoothBelt = BluetoothBelt
    }
  },
  actions: {
    connect({commit},BluetoothBelt){
      console.log("Save device in store...", BluetoothBelt);
      commit("addDevice",BluetoothBelt);
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
