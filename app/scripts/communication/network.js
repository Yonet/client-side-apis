let type;
let max;
let message;
let messageDiv = document.querySelector('#network-message');
var paragraphEl = document.createElement('p');

navigator.connection.addEventListener('change', changeHandler);

function changeHandler() {
  // Get the connection type.
  type = navigator.connection.type;
  max = navigator.connection.downlinkMax;

  message = "Your network's max speed is " + max;
  paragraphEl.textContent = message;
  messageDiv.appendChild(paragraphEl);

  // Network type that browser uses
  console.log('         type: ' + navigator.connection.type);

  // Effective bandwidth estimate
  console.log('     downlink: ' + navigator.connection.downlink + 'Mb/s');

  // Effective round-trip time estimate
  console.log('          rtt: ' + navigator.connection.rtt + 'ms');

  // Upper bound on the downlink speed of the first network hop
  console.log('  downlinkMax: ' + navigator.connection.downlinkMax + 'Mb/s');

  // Effective connection type determined using a combination of recently
  // observed rtt and downlink values: ' +
  console.log('effectiveType: ' + navigator.connection.effectiveType);
  
  // True if the user has requested a reduced data usage mode from the user
  // agent.
  console.log('     saveData: ' + navigator.connection.saveData);
}

changeHandler();