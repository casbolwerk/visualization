function updateCanvas() {
  var canvas = document.getElementById("mainCanvas");
  canvas.width = window.innerWidth; //document.width is obsolete
  canvas.height = window.innerHeight; //document.height is obsolete
  console.log(canvas.width)
  console.log(canvas.height)
  var canvasContainer = document.getElementsByClassName("canvas-container");
  canvasContainer.width = window.innerWidth;
  canvasContainer.height = window.innerHeight;
}
window.addEventListener('resize', updateCanvas);
updateCanvas();

function toColor(num) {
  num = num**3;
  num >>>= 0;
  var b = num & 0xFF,
      g = (num & 0xFF00) >>> 8,
      r = (num & 0xFF0000) >>> 16,
      a = ( (num & 0xFF000000) >>> 24 ) / 255 ;
  return "rgba(" + [r, g, b, a].join(",") + ")";
}

function determineColor(drawingTime) {
  var color = toColor(drawingTime);
  console.log(color)
  return color;
}

var letsDraw;
var startTime;

const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');

var canvasOffset = {
  left:canvas.offsetLeft,
  top:canvas.offsetTop
}

canvas.addEventListener('mousemove', e => {
  if (letsDraw) {
    var currTime = new Date();
    var drawingTime = startTime.getTime() - currTime.getTime();

    console.log('drawing')
    ctx.strokeStyle = determineColor(drawingTime);
    ctx.lineWidth = 3;
    ctx.beginPath();

    ctx.moveTo(letsDraw.x, letsDraw.y);
    ctx.lineTo(e.pageX - canvasOffset.left, e.pageY - canvasOffset.top);
    ctx.stroke();

    letsDraw = {
      x:e.pageX - canvasOffset.left,
      y:e.pageY - canvasOffset.top
    }
  }
});

window.addEventListener('mousedown', e => {
  console.log('mousedown');
  startTime = new Date();
  ctx.clearRect(0,0,canvas.width,canvas.height);
  letsDraw = {
      x:e.pageX - canvasOffset.left,
      y:e.pageY - canvasOffset.top
  }
  
  ctx.moveTo(letsDraw.x, letsDraw.y);
});

window.addEventListener('mouseout', e => {
  console.log('mouseout')
  letsDraw = null;
});
