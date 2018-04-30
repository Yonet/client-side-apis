// Import stylesheets

// Make functionality available when connected

let ledCharacteristic = null;
let poweredOn = false;

function onConnected() {
  document.querySelector('#connect-btn').classList.add('hidden');
  document.querySelector('#disconnect-btn').classList.remove('hidden')
  document.querySelector('#power-btn').classList.remove('hidden');
  document.querySelector('#colors').classList.remove('hidden');
  powerOn();
  poweredOn = true;
}

function onDisconnected() {
  document.querySelector('#connect-btn').classList.remove('hidden');
  document.querySelector('#disconnect-btn').classList.add('hidden');
  document.querySelector('#power-btn').classList.add('hidden');
  document.querySelector('#colors').classList.add('hidden');
}

function connect() {
  console.log('Connecting to the Magic Bulb');
  navigator.bluetooth.requestDevice(
    {
      filters: [{namePrefix:"LED"}]
    })
    .then(device => {
      console.log('> Found ' + device.name);
      console.log('Connecting to GATT Server...');
      device.addEventListener('gattserverdisconnected', onDisconnected)
      topDevice = device;
      return device.gatt.connect();
    })
    .then(server => {
      console.log('Getting Service 0xffe5 - Light control...', server);
      return server.getPrimaryService(0xffe5);
    })
    .then(service => {
      console.log('Getting Characteristic 0xffe9 - Light control...', service);
      return service.getCharacteristic(0xffe9);
    })
    .then(characteristic => {
      console.log('All ready!', characteristic);
      ledCharacteristic = characteristic;
      onConnected();
    })
    .catch(error => {
      console.log('Something went wrong: ' + error);
    });
}

function disconnect() {
  console.log("Trying to disconnect...");
  topDevice.gatt.disconnect();
  console.log('Disconnected!');
}

// Connection
const connectButton = document.getElementById("connect-btn");
connectButton.onclick = connect;

// Connection
const disconnectButton = document.getElementById("disconnect-btn");
disconnectButton.onclick = disconnect;

// Power Button function
const powButton = document.getElementById("power-btn");
powButton.onclick = togglePower;

const updateButton = document.getElementById("update-color");
updateButton.onclick = updateColor;

function powerOn() {
  let data = new Uint8Array([0xcc, 0x23, 0x33]);
  return ledCharacteristic.writeValue(data)
    .catch(err => console.log('Error when powering on! ', err))
    .then(() => {
      poweredOn = true;
      toggleButtons();
    });
}

function powerOff() {
  let data = new Uint8Array([0xcc, 0x24, 0x33]);
  return ledCharacteristic.writeValue(data)
    .catch(err => console.log('Error when switching off! ', err))
    .then(() => {
      poweredOn = false;
      toggleButtons();
    });
}

function togglePower() {
  if (poweredOn) {
    powerOff();
  } else {
    powerOn();
  }
  console.log("Toggled!")
}

function toggleButtons() {
  document.getElementById("update-color").disabled = !poweredOn
}

function setColor(red, green, blue) {
  // 0x56 color change command, red, green, blue, warmth, placeholders (0xf0, 0xaa)
  // https://medium.com/@urish/reverse-engineering-a-bluetooth-lightbulb-56580fcb7546
  let data = new Uint8Array([0x56, red, green, blue, 0x00, 0xf0, 0xaa]);
  console.log('Changing color', ledCharacteristic);
  return ledCharacteristic.writeValue(data)
    .catch(err => console.log('Error when writing value! ', err));
}

function updateColor() {
  const red = document.getElementById("red").value;
  const green = document.getElementById("green").value;
  const blue = document.getElementById("blue").value;
  return setColor(red, green, blue)
    .then(() => console.log('Color set to ' + red + ',', green, ',' + blue));
}
