
export default {
      isWebBLEAvailable() {
            return navigator.bluetooth;
            // True: Web BLE works
      },

      showAllDevices(store) {

            let options = {
                  acceptAllDevices: true
            };

            this.requestDevice(options, store);
      },

      showFilteredNameDevices(name, store) {

            let options = {
                  filters: [
                        { name: name },
                        { services: [0x1800, 0x1801, 0x180F, 0x181A] }
                  ]
            };

            this.requestDevice(options, store);
      },

      showFilteredPrefixDevices(nameprefix, store) {

            let options = {
                  filters: [
                        { namePrefix: nameprefix },
                        { services: [0x1800, 0x1801, 0x180F, 0x181A] }
                  ]
            }

            this.requestDevice(options, store);
      },

      requestDevice(options, store) {
            if (this.isWebBLEAvailable) {
                  console.log("Searching devices");

                  navigator.bluetooth.requestDevice(options).then(device => {
                        device.gatt.connect().then(server => {
                              server.getPrimaryService(0x181A).then(service => {
                                    service.getCharacteristic(0x2A6E).then(characteristicdata => {
                                          characteristicdata.readValue().then(data => {
                                                const values = new Int16Array(data.buffer);
                                                let temp = (values[0] / 100)
                                                temp = (temp+6).toFixed(2) // Correction factor of 18 compared to DHT11
                                                // temp = temp.toFixed(2)
                                                console.log("Temp: ", temp, "°C")
                                                store.dispatch("storeBluetoothTemp", {"temp": temp, "index": this.getMeasuredValuesIndex(device.id, store), "id": device.id});
                                          })
                                    })

                                    service.getCharacteristic(0x2A6F).then(characteristicdata => {
                                          characteristicdata.readValue().then(data => {
                                                const values = new Int16Array(data.buffer);
                                                let hum = (values[0] + 18.36).toFixed(2) // Correction factor of 18 compared to DHT11
                                                // let hum = (values[0] /100).toFixed(2)
                                                console.log("hum:", hum, "%")
                                                store.dispatch("storeBluetoothHum", {"hum": hum, "index": this.getMeasuredValuesIndex(device.id, store), "id": device.id});
                                          })
                                    })

                                    service.getCharacteristic(0x2A19).then(characteristicdata => {
                                          characteristicdata.readValue().then(data => {
                                                const values = new Int8Array(data.buffer);
                                                let batlevel = values[0]
                                                console.log("Batterylevel:", batlevel, "%")
                                                store.dispatch("storeBluetoothBatt", {"batlevel": batlevel, "index": this.getMeasuredValuesIndex(device.id, store), "id": device.id});
                                          })
                                    })

                                    service.getCharacteristic(0x2A6E).then(characteristicdata => {
                                          characteristicdata.startNotifications().then(data => {
                                                const values = new Int16Array(data.value.buffer);
                                                let temp = (values[0] / 100)
                                                temp = (temp +6).toFixed(2) 
                                                // temp = temp.toFixed(2)
                                                console.log("Temp: NOTIFICATION", temp, "°C")
                                                store.dispatch("storeBluetoothTemp", {"temp": temp, "index": this.getMeasuredValuesIndex(device.id, store), "id": device.id});
                                          })
                                    })

                                    service.getCharacteristic(0x2A6F).then(characteristicdata => {
                                          characteristicdata.startNotifications().then(data => {
                                                const values = new Int16Array(data.value.buffer);
                                                let hum = (values[0] + 18.36).toFixed(2) // Correction factor of 18 compared to DHT11
                                                // let hum = (values[0] /100).toFixed(2)
                                                console.log("hum: NOTIFICATION", hum, "%")
                                                store.dispatch("storeBluetoothHum", {"hum": hum, "index": this.getMeasuredValuesIndex(device.id, store), "id": device.id});
                                          })
                                    })

                                    service.getCharacteristic(0x2A19).then(characteristicdata => {
                                          characteristicdata.startNotifications().then(data => {
                                                const values = new Int8Array(data.value.buffer);
                                                let batlevel = values[0]
                                                console.log("Batterylevel: NOTIFICATION", batlevel, "%")
                                                store.dispatch("storeBluetoothBatt", {"batlevel": batlevel, "index": this.getMeasuredValuesIndex(device.id, store), "id": device.id});
                                          })
                                    })
                                    
                                    
                              })
                              console.log("PrimaryService", server) // Store service data in Store (BluetoothData)
                        }); // Connect device
                        store.dispatch("connect", device) // Save device to store
                  }).catch(error => {
                        console.log(error);
                  })
            }

            else {
                  console.log("Web BLE is not available!");
            }
      },

      disconnect(id, store) {

            let i = this.getIndex(id, store);

            let device = store.getters.getBluetoothBelt[i];
            if (device.gatt.connected) {
                  device.gatt.disconnect();
                  store.dispatch("disconnect", i);
            }
      },

      getIndex(id, store){
            let i = 0;
            while (i < store.getters.getBluetoothBelt.length) {
                  if (store.getters.getBluetoothBelt[i].id == id) {
                        return i;
                  }
                  i++;
            }  
            return -1;
      },
      getMeasuredValuesIndex(id, store){
            let i = 0;
            while (i < store.getters.getMeasuredValues.length) {
                  if (store.getters.getMeasuredValues[i].id == id) {
                        return i;
                  }
                  i++;
            }  
            return -1;
            
      }


}

