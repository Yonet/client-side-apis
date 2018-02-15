var button = document.querySelector('#push-btn');
var input = document.querySelector('#push-input');

var notify = function() {
  var options = {
    body: input.value,
    tag: 'foo',
    type: 'basic'
  };
  var n = new Notification('Greetings from ForwardJS!', options);

  n.onclick = function() {
    console.log('Clicked.');
  };
  n.onclose = function() {
    console.log('Closed.');
  };
  n.onshow = function() {
    console.log('Shown.');
  };
};

button.onclick = function() {
  if (!('Notification' in window)) {
    alert('This browser does not support desktop notification');
  } else if (Notification.permission === 'granted') {
    notify();
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function(permission) {
      if (!('permission' in Notification)) {
        Notification.permission = permission;
      }
      if (permission === 'granted') {
        notify();
      }
    });
  }
};