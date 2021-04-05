
export default{
      isWebBLEAvailable(){
            return navigator.bluetooth;
            // True: Web BLE works
      },
      showAllDevices(){
            if(this.isWebBLEAvailable){
                  console.log("Searching devices");
    
                  let options = {
                        acceptAllDevices: true
                  };
      
                  navigator.bluetooth.requestDevice(options).then(device => {
                        console.log('Name: ' + device.name);
                  }).catch(error => {
                        console.log(error);
                  })
    
            }
            else{
                  console.log("Web BLE is not available!");
            }
      }
            
}

