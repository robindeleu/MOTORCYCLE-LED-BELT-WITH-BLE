import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  strict: true,
  state: {
    BluetoothBelt: [{'id': '7', 'name': 'Device' }, {'id':'3','name':'SecondDevice'}],
    HistoryBluetoothBelt: [{ 'id': '5', 'name': 'Device' }, { 'id': '3', 'name': 'Device' }],
    // BluetoothTemp:[],
    // BluetoothHum:[],
    // BluetoothBatt:[]
    BluetoothTemp: 0,
    BluetoothHum: 0,
    BluetoothBatt: 0,
    MeasuredValues: [{ 'id': '7', 'temp': 15.0, 'hum': 0.7, 'batt': 9 },{ 'id': '3', 'temp': 12.0, 'hum': 0.6, 'batt': 1 }],
    registeredusers: [{ "firstname": "deleu.robin@outlook.com", "lastname": "deleu.robin@outlook.com", "email": "151f43d51a7102a000f231c753a68ba8064f954766b6b42ef9b14503b64d1644", "password": "151f43d51a7102a000f231c753a68ba8064f954766b6b42ef9b14503b64d1644" },{"firstname":"test", "lastname":"test", "email":"f660ab912ec121d1b1e928a0bb4bc61b15f5ad44d5efdc4e1c92a25e99b8e44a", "password":"f660ab912ec121d1b1e928a0bb4bc61b15f5ad44d5efdc4e1c92a25e99b8e44a"}],
    // registeredusers: [],
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
    setBluetoothTemp(state, BluetoothTemp) {
      // state.BluetoothTemp.push(BluetoothTemp)
      state.BluetoothTemp = BluetoothTemp
    },
    setBluetoothHum(state, BluetoothHum) {
      // state.BluetoothHum.push(BluetoothHum)
      state.BluetoothHum = BluetoothHum
    },
    setBluetoothBatt(state, BluetoothBatt) {
      // state.BluetoothBatt.push(BluetoothBatt)
      state.BluetoothBatt = BluetoothBatt
    },
    deleteDeviceHistory(state, index) {
      state.HistoryBluetoothBelt.splice(index, 1);
    },
    setUser(state, user) {
      state.user = user;
    },
    setRegisteredusers(state, registeredusers) {
      // CHECK IF DEVICE IS ALREADY IN BluetoothBelt
      state.registeredusers.push(registeredusers) //adding object to array!
    },
    updateMeasuredValues(state, id){
      console.log(id);
      let i = 0;
      let idFound = false;
      while(i<state.MeasuredValues.length){
        if(state.MeasuredValues[i].id == id){
          idFound = true;
          break;
        }
        i++;
      }
      console.log(state.MeasuredValues);
      console.log(idFound);
      console.log(i);
      if(idFound){
        state.MeasuredValues[i].temp = state.BluetoothTemp;
        state.MeasuredValues[i].hum = state.BluetoothHum;
        state.MeasuredValues[i].batt = state.BluetoothBatt;
      }
      else{
        state.MeasuredValues.push(// CHECK IF ID IS NOT PRESENT YET
          {
            'id':id,
            'temp':state.BluetoothTemp,
            'hum':state.BluetoothHum,
            'batt':state.BluetoothBatt
          }
        );
      }
    console.log(state.MeasuredValues);
    }
  },
  actions: {
    connect({ commit }, BluetoothBelt) {
      console.log("Save device in store...", BluetoothBelt);
      commit("setDevice", BluetoothBelt);
      commit("setDeviceHistory", BluetoothBelt);
    },
    disconnect({ commit }, index) {
      console.log("Delete device out of the store...");
      commit("deleteDevice", index);
    },
    storeBluetoothTemp({ commit }, BluetoothTemp) {
      console.log("Save BluetoothTemp in store...", BluetoothTemp);
      commit("setBluetoothTemp", BluetoothTemp);
    },
    storeBluetoothHum({ commit }, BluetoothHum) {
      console.log("Save BluetoothHum in store...", BluetoothHum);
      commit("setBluetoothHum", BluetoothHum);
    },
    storeBluetoothBatt({ commit }, BluetoothBatt) {
      console.log("Save BluetoothBatt in store...", BluetoothBatt);
      commit("setBluetoothBatt", BluetoothBatt);
    },
    deleteHistoryDevice({ commit }, index) {
      console.log("Delete device out of history");
      commit("deleteDeviceHistory", index);
    },
    login({ commit }, user) {
      console.log(`Storing user ...`);
      console.log(`User in Store during login`, user);
      commit("setUser", user);
    },
    logout({ commit }) {
      console.log(`Clearing user ...`);
      commit("setUser", {});
      commit("deleteAllDevices");
      console.log(`User in Store after : logout`);
    },
    storeregisteredusers({ commit }, registeredusers) {
      console.log("Save registeredusers in store...", registeredusers);
      commit("setRegisteredusers", registeredusers);
    },
    updateMeasuredValues({commit}, id){
      commit("updateMeasuredValues", id);
    }
  },
  getters: {
    getBluetoothBelt(state) {
      return state.BluetoothBelt;
    },
    getHistoryBluetoothBelt(state) {
      return state.HistoryBluetoothBelt;
    },
    /*getBluetoothTemp(state, i) {
      console.log(i);
      console.log(state.MeasuredValues[0])
      return state.MeasuredValues[i].temp;
    },
    getBluetoothHum(state, i) {
      return state.MeasuredValues[i].hum;
    },
    getBluetoothBatt(state, i) {
      return state.MeasuredValues[i].batt;
    },*/
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
