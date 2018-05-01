const pushButton = document.querySelector('#push-btn');
var pushInput = document.querySelector('#push-input');

var notify = function() {
  var options = {
    body: pushInput.value,
    tag: 'foo',
    type: 'basic'
  };
  var n = new Notification('Greetings from Front End Masters!', options);

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

pushButton.onclick = function() {
  if (!('Notification' in window)) {
    console.log('This browser does not support desktop notification');
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
