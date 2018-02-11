console.log('geolocation');
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