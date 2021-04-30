import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    BluetoothBelt:[],
    HistoryBluetoothBelt:[{'id': '5', 'name':'Device'},{'id':'3','name':'Device'}],
    BluetoothData:[]
  },
  mutations: {
    setDevice(state, BluetoothBelt) {
      // CHECK IF DEVICE IS ALREADY IN BluetoothBelt
      state.BluetoothBelt.push(BluetoothBelt) //adding object to array!
    },
    setDeviceHistory(state, BluetoothBelt) {
      // CHECK IF DEVICE IS ALREADY IN HistoryBelt
      let alreadyInHistory = false;

      for(let i = 0; i < state.HistoryBluetoothBelt.length; i++){
        if(Object.keys(state.HistoryBluetoothBelt[i]).length === Object.keys(BluetoothBelt).length 
          && Object.keys(state.HistoryBluetoothBelt[i]).every(j => state.HistoryBluetoothBelt[i][j] === BluetoothBelt[j]))
          {
            alreadyInHistory = true;
            break;
          }
      }

      if(!alreadyInHistory){
        state.HistoryBluetoothBelt.push(BluetoothBelt)
      }

    },
    deleteDevice(state, index){
      state.BluetoothBelt.splice(index,1);
    },
    setBluetoothData(state, BluetoothData){
      state.BluetoothData.push(BluetoothData)
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
    storeBluetoothData({commit},BluetoothData){
      console.log("Save DATA in store...", BluetoothData);
      commit("setBluetoothData",BluetoothData);
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
    getBluetoothData(state){
      return state.BluetoothData;
    },
  },
  modules: {
  }
})
