import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    BluetoothBelt:[],
    HistoryBluetoothBelt:[]
  },
  mutations: {
    setDevice(state, BluetoothBelt) {
      // CHECK IF DEVICE IS ALREADY IN BluetoothBelt
      state.BluetoothBelt.push(BluetoothBelt) //adding object to array!
    },
    setDeviceHistory(state, BluetoothBelt) {
      // CHECK IF DEVICE IS ALREADY IN HistoryBelt
      state.HistoryBluetoothBelt.push(BluetoothBelt)
    },
    deleteDevice(state, index){
      state.BluetoothBelt.splice(index,1);
    },
    deleteDeviceHistory(state, index){
      state.HistoryBluetoothBelt.splice(index,1);
    }
  },
  actions: {
    connect({commit},BluetoothBelt){
      console.log("Save device in store...", BluetoothBelt);
      commit("setDevice",BluetoothBelt);
      commit("setDeviceHistory",BluetoothBelt);
    },
    disconnect({commit},index){
      console.log("Delete device out of the store...");
      commit("deleteDevice",index);
    },
    deleteHistoryDevice({commit},index){
      console.log("Delete device out of history");
      commit("deleteDeviceHistory",index);
    }
  },
  getters: {
    getBluetoothBelt(state) {
      return state.BluetoothBelt;
    },
    getHistoryBluetoothBelt(state){
      return state.HistoryBluetoothBelt;
    },
  },
  modules: {
  }
})
