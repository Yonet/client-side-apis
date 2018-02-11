let timestampsLi = document.getElementById('timestamps');
let addButton = document.getElementById('add-indexed');
let displayButton = document.getElementById('display-indexed');

displayButton.addEventListener('click', displayIndexedData);
addButton.addEventListener('click', addToIndexed);


var DB_NAME = 'timestamps';
var DB_VERSION = 1;
var STORE_NAME = 'store';
var db;

var request = indexedDB.open(DB_NAME, DB_VERSION);
request.onupgradeneeded = function () {
    // Create a new object store if this is the first time we're using
    // this DB_NAME/DB_VERSION combo.
    request.result.createObjectStore(STORE_NAME, { autoIncrement: true });
};
request.onsuccess = function () {
    db = request.result;
    // Enable our buttons once the IndexedDB instance is available.
    addButton.disabled = false;
    displayButton.disabled = false;
};

function addToIndexed(e) {
    console.log('Adding to indexed ', e);
    var transaction = db.transaction(STORE_NAME, 'readwrite');
    var objectStore = transaction.objectStore(STORE_NAME);
    // Add the current timestamp to IndexedDB.
    objectStore.put(Date.now()).onsuccess = function () {
        console.log('Added timestamp to IndexedDB.');
    };
}

function displayIndexedData(e) {
    console.log('display clicked ', e);
    var transaction = db.transaction(STORE_NAME, 'readonly');
    var objectStore = transaction.objectStore(STORE_NAME);

    if ('getAll' in objectStore) {
        // IDBObjectStore.getAll() will return the full set of items in our store.
        objectStore.getAll().onsuccess = function (event) {
            let ts = event.target.result;
            console.log('event.target.result', ts);
            for(let i = 0; i < ts.length; i++){
                let li = document.createElement('li');
                li.textContent = ts[i];
                timestampsLi.appendChild(li);
            }
        };
    } else {
        // Fallback to the traditional cursor approach if getAll isn't supported.
        var timestamps = [];
        objectStore.openCursor().onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                timestamps.push(cursor.value);
                cursor.continue();
            } else {
                console.log('ts', timestamps);
            }
        };
    }
}