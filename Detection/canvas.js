// Learn to code this at:
// https://www.youtube.com/watch?v=3b7FyIxWW94

// Initial Setup
var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

// Variables
var mouse = {
  x: undefined,
  y: undefined,
};

var colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

// Event Listeners
addEventListener("mousemove", function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

addEventListener("click", function (event) {
  init();
});

// Utility Functions
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function getDistance(x1, y1, x2, y2) {
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;

  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}
// Objects
function Circle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;

  this.update = function () {
    this.draw();
  };

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
    c.closePath();
  };
}

// Implementation
let circle;
let mouseCircle;

function init() {
  circle = new Circle(400, 400, 100, "black");
  mouseCircle = new Circle(mouse.x, mouse.y, 50, "red");
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  c.clearRect(0, 0, canvas.width, canvas.height);

  circle.update(circle);
  mouseCircle.x = mouse.x;
  mouseCircle.y = mouse.y;
  mouseCircle.update(mouseCircle);
  if (
    getDistance(circle.x, circle.y, mouseCircle.x, mouseCircle.y) <
    circle.radius + mouseCircle.radius
  ) {
    circle.color = "red";
  } else {
    circle.color = "black";
  }
}

init();
animate();
