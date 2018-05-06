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
    createCanvas(640, 480);
    background(bg);
    noStroke();
    fill(bg);
    currentStrokeColor = color(0, 0, 0);
    stroke(currentStrokeColor);
    cursor(CROSS);
}


function draw() {
    addLine();
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


// hotkeys
function keyReleased() {
    if (keyCode === 90) {
        undo();
    }
    if (keyCode === 67) {
        clearScreen();
    }
    if (keyCode === 83) {
        saveDrawing();
    }
    // change color to red
    if (keyCode === 82 && mouseIsPressed === false) {
        currentStrokeColor = color(255, 0, 0);
    }
    // change color to green
    if (keyCode === 71 && mouseIsPressed === false) {
        currentStrokeColor = color(0, 255, 0);
    }
    // change color to blue
    if (keyCode === 66 && mouseIsPressed === false) {
        currentStrokeColor = color(0, 0, 255);
    }
    // change color to black
    if (keyCode === 75 && mouseIsPressed === false) {
        currentStrokeColor = color(0, 0, 0);
    }
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
    for (var i=0; i < lines.length; i ++) {
        stroke(strokeColors[i]);
        drawLine(lines[i]);
    }
}


// clear the drawing area
function clearScreen() {
    background(bg);
    noStroke();
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
    for (var i = 0; i < lines.length; i ++) {
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


// go to github page
function gotoGithub() {
    window.location.href = 'https://github.com/hanswillem/p5.js/tree/master/drawIdeasApp';
}
