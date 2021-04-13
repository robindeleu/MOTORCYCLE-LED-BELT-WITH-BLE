import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    BluetoothBelt:''
  },
  mutations: {
    addDevice(state, BluetoothBelt) {
      state.BluetoothBelt = BluetoothBelt
    }
  },
  getters: {
    BluetoothBelt: state => state.BluetoothBelt
  },
  actions: {
  },
  modules: {
  }
})
