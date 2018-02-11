console.log('Network here');
navigator.connection.addEventListener('change', logNetworkInfo);

function logNetworkInfo() {
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

logNetworkInfo();