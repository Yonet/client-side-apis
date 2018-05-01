let orientationEl = document.getElementById('orientation');
var currentOrientation;

window.screen.orientation.onchange = function(e){
    e.preventDefault();
    
    currentOrientation = e.srcElement.type;
    console.log('Hello screening',currentOrientation);
    orientationEl.textContent = "Orientation changed " + e.timeStamp;
}


