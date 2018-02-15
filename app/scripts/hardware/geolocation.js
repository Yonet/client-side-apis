let dataEl = document.querySelector('#geo-data');
let geoButton = document.querySelector('#geo-button');
geoButton.addEventListener('click', logPosition);

function log(message) {
    dataEl.innerHTML += message + '<br />' + dataEl.innerHTML;
}

navigator.geolocation.watchPosition(drawMap);

function logPosition() {
  navigator.geolocation.getCurrentPosition((position) => {
    drawMap(position);
  });
}

function drawMap(position) {
  log('latitude: ' + position.coords.latitude +
    ', longitude: ' + position.coords.longitude);
  const latLong = {lat: position.coords.latitude, lng: position.coords.longitude};

  const mapElement = geoButton.parentElement.querySelector('div:last-child') || document.createElement('div');
  mapElement.style.height = '500px';
  geoButton.parentElement.append(mapElement);

  var map = new google.maps.Map(mapElement, {
    zoom: 10,
    center: latLong
  });
  var marker = new google.maps.Marker({
    position: latLong,
    map: map
  });
}

navigator.permissions.query({name:'geolocation'}).then(function(p) {
    console.log('permission for geo ', p.state);
    p.onchange = function() {
        console.log('p changes ', p);
    }
})

navigator.permissions.query({name:'notifications'}).then(function(p) {
    console.log('permission for blue ', p);
    p.onchange = function() {
        console.log('p changes ', p);
    }
})

// To add the google maps go to: https://developers.google.com/maps/documentation/javascript/adding-a-google-map
