let sessionButton = document.getElementById('sessionButton').addEventListener('click', storeSession, false);

function storeSession(e) {
    e.preventDefault();
    var key = document.getElementById('sessionKey').value;
    var value = document.getElementById('sessionValue').value;
    console.log('storing ', key, value);
    sessionStorage.setItem(key, value);
}