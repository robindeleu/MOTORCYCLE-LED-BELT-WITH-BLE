import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    BluetoothBelt:[{id: "nCeOcwpsqYotSL5SSfY4tA==", name: "Motorcycle LED Kat"},{id: "jsgjkhfdsgfsdkjsdSfY4tA==", name: "Motorcycle LED Tom"}],
    HistoryBluetoothBelt:{}
  },
  mutations: {
    setDevice(state, BluetoothBelt) {

      state.BluetoothBelt = state.BluetoothBelt.push(BluetoothBelt) //adding object to array!
    },
    setDeviceHistory(state, BluetoothBelt) {
      state.HistoryBluetoothBelt = Object.assign(state.HistoryBluetoothBelt, BluetoothBelt)
    }
  },
  actions: {
    connect({commit},BluetoothBelt){
      console.log("Save device in store...", BluetoothBelt);
      commit("setDevice",BluetoothBelt);
      commit("setDeviceHistory",BluetoothBelt);
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
