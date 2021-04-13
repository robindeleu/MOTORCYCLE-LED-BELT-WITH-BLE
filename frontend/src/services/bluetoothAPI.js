
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

      showFilteredNameDevices(name){ // NOT TESTED YET!    
    
            let options = {
                  filters:[
                        {name: name}
                  ]
            };

            this.requestDevice(options); 
      },

      showFilteredPrefixDevices(nameprefix){ // NOT TESTED YET!

            let options = {
                  filters:[
                        {namePrefix: nameprefix}
                  ]       
            }

            this.requestDevice(options); 
      },

      requestDevice(options){
            if(this.isWebBLEAvailable) {
                  console.log("Searching devices");

                  navigator.bluetooth.requestDevice(options).then(device => {
                        console.log('Name: ' + device.name);
                  }).catch(error => {
                        console.log(error);
                  })

            }

            else {
                  console.log("Web BLE is not available!");
            }
      },

      disconnect(device){ // NOT TESTED YET!
            if(device.gatt.connected){
                  device.gatt.disconnect();
            }
      }
            
}

