import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  strict: true,
  state: {
    BluetoothBelt: [],
    HistoryBluetoothBelt: [],
    BluetoothTemp: 0,
    BluetoothHum: 0,
    BluetoothBatt: 0,
    MeasuredValues: [],
    registeredusers: [],
    user: {}
  },
  mutations: {
    setDevice(state, BluetoothBelt) {
      state.BluetoothBelt.push(BluetoothBelt) //adding object to array!
    },
    deleteAllDevices(state){
      state.BluetoothBelt = []
    },
    setDeviceHistory(state, BluetoothBelt) {
      // CHECK IF DEVICE IS ALREADY IN HistoryBelt
      let alreadyInHistory = false;

      for (let i = 0; i < state.HistoryBluetoothBelt.length; i++) {
        if (Object.keys(state.HistoryBluetoothBelt[i]).length === Object.keys(BluetoothBelt).length
          && Object.keys(state.HistoryBluetoothBelt[i]).every(j => state.HistoryBluetoothBelt[i][j] === BluetoothBelt[j])) {
          alreadyInHistory = true;
          break;
        }
      }

      if (!alreadyInHistory) {
        state.HistoryBluetoothBelt.push(BluetoothBelt)
      }

    },
    deleteDevice(state, index) {
      state.BluetoothBelt.splice(index, 1);
    },
    setBluetoothTemp(state, tempObj) {
      if(tempObj.index<0){
        state.MeasuredValues.push(
          {
            'id':tempObj.id,
            'temp':tempObj.temp,
            'hum':0,
            'batt':0
          }
        );
      }
      else{
        state.MeasuredValues[tempObj.index].temp = tempObj.temp;
      }
    },
    setBluetoothHum(state, humObj) {
      if(humObj.index<0){
        state.MeasuredValues.push({
          'id':humObj.id,
          'temp':0,
          'hum':humObj.hum,
          'batt':0
        })
      }
      else{
        state.MeasuredValues[humObj.index].hum = humObj.hum;
      }
    },
    setBluetoothBatt(state, batlevelObj) {
      if(batlevelObj.index<0){
        state.MeasuredValues.push({
          'id':batlevelObj.id,
          'temp':0,
          'hum':0,
          'batt':batlevelObj.batlevel
        })
      }
      else{
        state.MeasuredValues[batlevelObj.index].batt = batlevelObj.batlevel;
      }
    },
    deleteDeviceHistory(state, index) {
      state.HistoryBluetoothBelt.splice(index, 1);
    },
    setUser(state, user) {
      state.user = user;
    },
    setRegisteredusers(state, registeredusers) {
      state.registeredusers.push(registeredusers) //adding object to array!
    },
  },
  actions: {
    connect({ commit }, BluetoothBelt) {
      commit("setDevice", BluetoothBelt);
      commit("setDeviceHistory", {'id' : BluetoothBelt.id, 'name': BluetoothBelt.name});
    },
    disconnect({ commit }, index) {
      commit("deleteDevice", index);
    },
    storeBluetoothTemp({ commit }, tempObj) {
      commit("setBluetoothTemp", tempObj);
    },
    storeBluetoothHum({ commit }, humObj) {
      commit("setBluetoothHum", humObj);
    },
    storeBluetoothBatt({ commit }, batlevelObj) {
      commit("setBluetoothBatt", batlevelObj);
    },
    deleteHistoryDevice({ commit }, index) {
      commit("deleteDeviceHistory", index);
    },
    login({ commit }, user) {
      commit("setUser", user);
    },
    logout({ commit }) {
      commit("setUser", {});
      commit("deleteAllDevices");
    },
    storeregisteredusers({ commit }, registeredusers) {
      commit("setRegisteredusers", registeredusers);
    },
    deleteDevices({ commit }) {
      commit("deleteAllDevices");
    }
  },
  getters: {
    getBluetoothBelt(state) {
      return state.BluetoothBelt;
    },
    getHistoryBluetoothBelt(state) {
      return state.HistoryBluetoothBelt;
    },
    getUser(state) {
      return state.user;
    },
    getRegisteredusers(state) {
      return state.registeredusers;
    },
    getMeasuredValues(state) {
      return state.MeasuredValues;
    }
  },
  modules: {
  }
})
