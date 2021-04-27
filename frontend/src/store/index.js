import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    BluetoothBelt:[],
    HistoryBluetoothBelt:[],
    BluetoothData:[]
  },
  mutations: {
    setDevice(state, BluetoothBelt) {

      state.BluetoothBelt.push(BluetoothBelt) //adding object to array!
    },
    setDeviceHistory(state, BluetoothBelt) {
      state.HistoryBluetoothBelt = Object.assign(state.HistoryBluetoothBelt, BluetoothBelt)
    },
    deleteDevice(state, index){
      state.BluetoothBelt.splice(index,1);
    },
    setBluetoothData(state, BluetoothData){
      state.BluetoothData.push(BluetoothData) // adding new objects to BluetoothData array
      // With this implementation we can save data from all time
    }
  },
  actions: {
    connect({commit},BluetoothBelt){
      console.log("Save device in store...", BluetoothBelt);
      commit("setDevice",BluetoothBelt);
      commit("setDeviceHistory",BluetoothBelt);
    },
    disconnect({commit},i){
      console.log("Delete device out off store...");
      commit("deleteDevice",i);
    },
    storeBluetoothData({commit},BluetoothData){
      console.log("Save data in store...", BluetoothData);
      commit("setBluetoothData",BluetoothData);
    },
  },
  getters: {
    getBluetoothBelt(state) {
      return state.BluetoothBelt;
    },
    getHistoryBluetoothBelt(state){
      return state.HistoryBluetoothBelt;
    },
    getBluetoothData(state){
      return state.BluetoothData;
    },
  },
  modules: {
  }
})
