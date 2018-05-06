var lines = [];
var currentLine = [];
var bg;
var bt1, bt2, bt3;
var cbt1, cbt2, cbt3;
var g;
var strokeColors = [];
var currentStrokeColor;


function setup() {
  bg = 225;
  noSmooth();
  createCanvas(640, 512);
  background(bg);
  noStroke();
  fill(bg);
  currentStrokeColor = color(0, 0, 0);
  stroke(currentStrokeColor);
  cursor(CROSS);
}


function draw() {
  addLine();
  stroke(0);
  drawHud();
}


// when the mouse is released, and the mouse is on the drawing area, add a new line
function mouseClicked() {
  lines.push(currentLine);
  strokeColors.push(currentStrokeColor);
  currentLine = [];
}


// add a new line to the lines array
function addLine() {
  stroke(currentStrokeColor);
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
    currentLine.push([pmouseX, pmouseY, mouseX, mouseY])
  }
}


// draws a line from an array
function drawLine(arr) {
  for (var i = 0; i < arr.length; i++) {
    line(arr[i][0], arr[i][1], arr[i][2], arr[i][3]);
  }
}


// draws the hud with the instructions
function drawHud() {
  // clear
  noStroke();
  fill(bg);
  rect(0, 480, width, 640);
  // draw line and text
  stroke(0, 50);
  line(0, 480, width, 480);
  noStroke();
  fill(100);
  textSize(14);
  text('draw with mouse    k = black    r = red    g = green    b = blue    z = undo    c = clear    s = download', 10, 502)
}


// hotkeys
function keyReleased() {
  // 'z'
  if (keyCode === 90) {
    undo();
  }
  // 'c'
  if (keyCode === 67) {
    clearScreen();
  }
  // 's'
  if (keyCode === 83) {
    saveDrawing();
  }
  // 'r'
  // change color to red
  if (keyCode === 82 && mouseIsPressed === false) {
    currentStrokeColor = color(255, 0, 0);
  }
  // 'g'
  // change color to green
  if (keyCode === 71 && mouseIsPressed === false) {
    currentStrokeColor = color(0, 255, 0);
  }
  // 'b'
  // change color to blue
  if (keyCode === 66 && mouseIsPressed === false) {
    currentStrokeColor = color(0, 0, 255);
  }
  // 'k'
  // change color to black
  if (keyCode === 75 && mouseIsPressed === false) {
    currentStrokeColor = color(0, 0, 0);
  }
  // 'w'
  // change color to white
  if (keyCode === 87 && mouseIsPressed === false) {
    currentStrokeColor = color(255, 255, 255);
  }
}


// undo
function undo() {
  background(bg);
  noStroke();
  stroke(0);
  lines.pop();
  strokeColors.pop();
  for (var i = 0; i < lines.length; i++) {
    stroke(strokeColors[i]);
    drawLine(lines[i]);
  }
}


// clear the drawing area
function clearScreen() {
  noStroke();
  fill(bg);
  rect(0, 0, 640, 480);
  stroke(0);
  strokeColors = [];
  lines = [];
}


// save a drawing as an png image with a white background
function saveDrawing() {
  g = createGraphics(640, 480);
  g.stroke(255);
  g.fill(255);
  g.rect(0, 0, 640, 480);
  g.stroke(0);
  for (var i = 0; i < lines.length; i++) {
    g.stroke(strokeColors[i]);
    g_drawLine(lines[i]);
  }
  save(g, 'drawing.png');
}


// draw a line in a graphics buffer (to save it to a png file later)
function g_drawLine(arr) {
  for (var i = 0; i < arr.length; i++) {
    g.line(arr[i][0], arr[i][1], arr[i][2], arr[i][3]);

  }
}


// change color to black
function strokeBlack() {
  currentStrokeColor = color(0, 0, 0);
}


// change color to red
function strokeRed() {
  currentStrokeColor = color(255, 0, 0);
}


// change color to green
function strokeGreen() {
  currentStrokeColor = color(0, 255, 0);
}


// change color to blue
function strokeBlue() {
  currentStrokeColor = color(0, 0, 255);
}
