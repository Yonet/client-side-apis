console.log('local');
let storeButton = document.getElementById('storeButton').addEventListener('click', storeLocal, false);



let retrieveButton = document.getElementById('retrieveButton').addEventListener('click', retrieveVal, false);

function storeLocal() {

    var key = document.getElementById('storeKey').value;
    var value = document.getElementById('storeValue').value;
    console.log('storing ', key, value);
    // same as localStorage[key] = value;
    localStorage.setItem(key, value);
}

function retrieveVal() {
    var key = document.getElementById('retrieveKey').value;
    var value = window.localStorage[key];
    console.log("retrieved ", value);
    document.getElementById('retrieveValue').value = value;
}