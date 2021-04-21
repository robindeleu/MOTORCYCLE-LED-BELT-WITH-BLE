
export default{
      isWebBLEAvailable(){
            return navigator.bluetooth;
            // True: Web BLE works
      },

      showAllDevices(){
    
            let options = {
                  acceptAllDevices: true
            };
                  
            this.requestDevice(options);
      },

      showFilteredNameDevices(name){ 
    
            let options = {
                  filters:[
                        {name: name}
                  ]
            };

            this.requestDevice(options); 
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
                        console.log(device);
                        device.gatt.connect(); // Connect device
                        console.log(device);
                        store.dispatch("connect",device); // Save device to store
                        console.log(store.getters.getBluetoothBelt);
                  }).catch(error => {
                        console.log(error);
                  })

            }

            else {
                  console.log("Web BLE is not available!");
            }
      },

      disconnect(device, store){ // NOT TESTED YET! //Don't work
            // device.gatt.disconnect();
            if(device.gatt.connected){
                  device.gatt.disconnect();
                  store.dispatch("disconnect");
            }
      }
            
}

