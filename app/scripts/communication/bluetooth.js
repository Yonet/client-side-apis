let options = {
    "acceptAllDevices": true
};
navigator.bluetooth.requestDevice(options)
    .then(function(device) {
      // Step 2: Connect to it
      console.log('Connecting to device ', device)
    //   return device.gatt.connect();
    })
    // .then(function(server) {
    //   // Step 3: Get the Service
    //   return server.getPrimaryService(0xffe5);
    // })
    // .then(function(service) {
    //   // Step 4: get the Characteristic
    //   return service.getCharacteristic(0xffe9);
    // })
    // .then(function(characteristic) {
    //   // Step 5: Write to the characteristic
    //   var data = new Uint8Array([0xbb, 0x25, 0x05, 0x44]);
    //   return characteristic.writeValue(data);
    // })
    .catch(function(error) {
       // And of course: error handling!
       console.error('Connection failed!', error);
    });