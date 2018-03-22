import Tone from 'tone';

//create a level meter
var meter = new Tone.Meter();

var player = new Tone.Player({
  "url" : "media/all_the_stars.mp3",
  "loop" : true
}).connect(meter).toMaster();

// GUI //

//start button
Interface.Button({
  key : 32,
  type : "toggle",
  text : "Start",
  activeText : "Stop",
  start : function(){
    player.start();
  },
  end : function(){
    player.stop();
  }
});

//drawing the FFT
var meterContext = $("<canvas>",{
  "id" : "fft"
}).appendTo("#Content").get(0).getContext("2d");

var meterGraident;

function drawMeter(){
  var level = meter.getLevel();
  level = Tone.dbToGain(level); //scale it between 0 - 1
  meterContext.clearRect(0, 0, canvasWidth, canvasHeight);
  meterContext.fillStyle = meterGraident;
  meterContext.fillRect(0, 0, canvasWidth, canvasHeight);
  meterContext.fillStyle = "white";
  meterContext.fillRect(canvasWidth * level, 0, canvasWidth, canvasHeight);
}

//size the canvase
var canvasWidth, canvasHeight;

function sizeCanvases(){
  canvasWidth = $("#fft").width();
  canvasHeight = $("#fft").height();
  meterContext.canvas.width = canvasWidth;
  meterContext.canvas.height = canvasHeight;
  //make the gradient
  meterGraident = meterContext.createLinearGradient(0, 0, canvasWidth, canvasHeight);
  meterGraident.addColorStop(0, "#BFFF02");
  meterGraident.addColorStop(0.8, "#02FF24");
  meterGraident.addColorStop(1, "#FF0202");
}

sizeCanvases();
$(window).resize(sizeCanvases);

function loop(){
  requestAnimationFrame(loop);
  //draw the meter level
  drawMeter();
}
loop();
