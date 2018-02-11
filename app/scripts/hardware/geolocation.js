let dataEl = document.querySelector('#geo-data');
let geoButton = document.querySelector('#geo-button').addEventListener('click', logPosition);

function log(message) {
    dataEl.innerHTML += message + '<br />' + dataEl.innerHTML;
}

navigator.geolocation.watchPosition(logPosition);

function logPosition(position) {
    if(!position) {
        navigator.geolocation.getCurrentPosition((position)=> log('latitude: ' + position.coords.latitude +
        ', longitude: ' + position.coords.longitude))
    } else {
        log('latitude: ' + position.coords.latitude +
        ', longitude: ' + position.coords.longitude);
    }
  
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