
export default{
      isWebBLEAvailable(){
            return navigator.bluetooth;
            // True: Web BLE works
      },

      showAllDevices(store){
    
            let options = {
                  acceptAllDevices: true
            };
                  
            this.requestDevice(options, store);
      },

      showFilteredNameDevices(name, store){ 
    
            let options = {
                  filters:[
                        {name: name},
                        {services: [0x1800, 0x1801, 0x180F, 0x181A]}
                  ]
            };

            this.requestDevice(options, store); 
      },

      showFilteredPrefixDevices(nameprefix, store){

            let options = {
                  filters:[
                        {namePrefix: nameprefix},
                        {services: [0x1800, 0x1801, 0x180F, 0x181A]}
                  ]       
            }

            this.requestDevice(options, store); 
      },

      requestDevice(options, store){
            if(this.isWebBLEAvailable) {
                  console.log("Searching devices");

                  navigator.bluetooth.requestDevice(options).then(device => {
                        device.gatt.connect().then(server => {
                              server.getPrimaryService(0x181A).then(service => {
                                    service.getCharacteristic(0x2A6E).then( characteristicdata =>{
                                          characteristicdata.readValue().then(data =>{
                                                // let info = data.buffer
                                                console.log("Temp:", data.buffer)
                                          })
                                    })
                                    console.log("getCharacteristic",service.getCharacteristic(0x2A6E))
                                    store.dispatch("storeBluetoothTemp",service);

                                    service.getCharacteristic(0x2A6F).then( characteristicdata =>{
                                          characteristicdata.readValue().then(data =>{
                                                
                                                console.log("hum:", data)
                                          })
                                    })
                                    console.log("getCharacteristic",service.getCharacteristic(0x2A6E))
                                    store.dispatch("storeBluetoothHum",service);

                                    
                              })
                              console.log("PrimaryService",server) // Store service data in Store (BluetoothData)
                        }); // Connect device
                        store.dispatch("connect",device); // Save device to store
                  }).catch(error => {
                        console.log(error);
                  })

            }

            else {
                  console.log("Web BLE is not available!");
            }
      },

      disconnect(id, store){
            // device.gatt.disconnect();
            let i = 0;
            while (i < store.getters.getBluetoothBelt.length){
                  if(store.getters.getBluetoothBelt[i].id == id){
                        break;
                  }
                  i++;
            }

            let device = store.getters.getBluetoothBelt[i];
            if(device.gatt.connected){
                  device.gatt.disconnect();
                  store.dispatch("disconnect", i);
            }
      }
            
}

