let orientationEl = document.getElementById('orientation');
window.screen.orientation.onchange = function(e){
    e.preventDefault();
    console.log('Hello screening',e);
    orientationEl.textContent = "Orientation changed " + e.timeStamp;
}

