
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
                        {name: name}
                  ]
            };

            this.requestDevice(options, store); 
      },

      showFilteredPrefixDevices(nameprefix, store){

            let options = {
                  filters:[
                        {namePrefix: nameprefix}
                  ]       
            }

            this.requestDevice(options, store); 
      },

      requestDevice(options, store){
            if(this.isWebBLEAvailable) {
                  console.log("Searching devices");

                  navigator.bluetooth.requestDevice(options).then(device => {
                        console.log('Name: ' + device.name);
                        device.gatt.connect(); // Connect device
                        store.dispatch("connect",device); // Save device to store
                        console.log(store.getters.getBluetoothBelt).then(server => {
                              server.getPrimaryService(0xffe5) //Get the service you want, NEED ADJUSTMENTS!!!!
                              store.dispatch("storeBluetoothData",server); // Store service data in Store (BluetoothData)
                        });
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

