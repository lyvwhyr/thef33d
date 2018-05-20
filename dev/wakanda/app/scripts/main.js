var particles = new THREE.Geometry;
//analyse the frequency/amplitude of the incoming signal
var fft = new Tone.FFT(1024);
//get the waveform data for the audio
var waveform = new Tone.Waveform(1024);

//create a level meter
var meter = new Tone.Meter(0.0);



var player = new Tone.Player({
  "url" : "media/all_the_stars.mp3",
  "loop" : true
})
.fan(fft, waveform, meter)
.toMaster();


const toggleButtom = document.getElementById('btn_toggle');
toggleButtom.addEventListener('click',  () => {
  player.volume.value = -12;
  player.start();
  player.seek(130);
});

//drawing the FFT
var fftContext = $("<canvas>",{
  "id" : "fft"
}).appendTo("body").get(0).getContext("2d");

function drawFFT(values){
  fftContext.clearRect(0, 0, canvasWidth, canvasHeight);
  var barWidth = canvasWidth / fft.size;
  for (var i = 0, len = values.length; i < len; i++){
    var x = canvasWidth * (i / len);
    var y = (values[i] + 80) * 10;
    fftContext.fillStyle = "rgba(156, 39, 176, " + i/len + ")";
    fftContext.fillRect(x, canvasHeight - y, barWidth, canvasHeight);
  }
}
//the waveform data
var waveContext = $("<canvas>", {
  "id" : "waveform"
}).appendTo("body").get(0).getContext("2d");
var waveformGradient;
function drawWaveform(values){
  //draw the waveform
  waveContext.clearRect(0, 0, canvasWidth, canvasHeight);
  waveContext.beginPath();
  waveContext.lineJoin = "round";
  waveContext.lineWidth = 6;
  waveContext.strokeStyle = waveformGradient;
  waveContext.moveTo(0, (values[0] / 255) * canvasHeight);
  for (var i = 1, len = values.length; i < len; i++){
    var val = (values[i] + 1) / 2;
    var x = canvasWidth * (i / len);
    var y = val * canvasHeight;
    waveContext.lineTo(x, y);
  }
  waveContext.stroke();
}

//drawing the FFT
var meterContext = $("<canvas>",{
  "id" : "fft"
}).appendTo("body").get(0).getContext("2d");
var meterGradient;
function drawMeter(){
  const level = meter.getLevel();
  const gain = Tone.dbToGain(level); //scale it between 0 - 1
  // console.log(level);
  meterContext.clearRect(0, 0, canvasWidth, canvasHeight);
  meterContext.fillStyle = meterGradient;
  meterContext.fillRect(0, 0, canvasWidth, canvasHeight);
  meterContext.fillStyle = "#212121";
  meterContext.fillRect(canvasWidth * gain, 0, canvasWidth, canvasHeight);
}

//size the canvases
var canvasWidth, canvasHeight;
function sizeCanvases(){
  canvasWidth = $("#fft").width();
  canvasHeight = $("#fft").height();
  waveContext.canvas.width = canvasWidth;
  fftContext.canvas.width = canvasWidth;
  waveContext.canvas.height = canvasHeight;
  fftContext.canvas.height = canvasHeight;
  meterContext.canvas.width = canvasWidth;
  meterContext.canvas.height = canvasHeight;
  //make the meter gradient
  meterGradient = meterContext.createLinearGradient(0, 0, canvasWidth, canvasHeight);
  meterGradient.addColorStop(0, "#4A148C");
  meterGradient.addColorStop(1, "#D500F9");
  //make the gradient
  waveformGradient = waveContext.createLinearGradient(0, 0, canvasWidth, canvasHeight);
  waveformGradient.addColorStop(0, "#4A148C");
  waveformGradient.addColorStop(1, "#D500F9");
}
sizeCanvases();
$(window).resize(sizeCanvases);
function loop(){
  requestAnimationFrame(loop);
  //get the fft data and draw it
  var fftValues = fft.getValue();
  drawFFT(fftValues);
  //get the waveform values and draw it
  var waveformValues = waveform.getValue();
  drawWaveform(waveformValues);

  drawMeter();
}
loop();
