let orientationEl = document.getElementById('orientation');
window.screen.orientation.onchange = function(e){
    console.log('Hello screen',e);
    orientationEl.textContent = "Orientation changed " + e.timeStamp;
}

