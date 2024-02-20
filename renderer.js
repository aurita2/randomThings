
"use strict";
// renderer.js
// kinda like the front end code

// const { ipcRenderer } = require("electron");

console.log('render.js is running');

let canvas;
let ctx;
let flowField;
let flowFieldAnimation;

window.onload = () => {
    canvas = document.getElementById('mainCanvas');
    ctx = canvas.getContext('2d');
    // we can get canvas.width in other parts of code
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
    flowField.animate();
} 

window.addEventListener('resize', function() {
    // make sure to cancle old animation from onlaod so we don't end up with multipulanimation instances
    // can do this by calling the cancelAnimationFrame method and passing it are animation var
    cancelAnimationFrame(flowFieldAnimation); // stops the onload animation on window resize
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height); // creates new animataion instance after >>
    // >> resizing canvas to new window size and cancling animation of the onlaod instances of animation
    flowField.animate();
});

const mouse = {
    x: 0,
    y: 0,
};
window.addEventListener('mousemove', function(e) {
    mouse.x = e.x;
    mouse.y = e.y;
});

// this class takes are canvas.width and height as args and then sets its own internal values to it so we don't
// have to use global objects this is good, not sure why.
class FlowFieldEffect {
    //# private can not be used outside of class
    // used to spesify what canvas to draw on
    #ctx;
    #width;
    #height;
    constructor (ctx, width, height) {
        this.#ctx = ctx;
        this.#ctx.strokeStyle ='white';
        this.#ctx.lineWidth = 5;
        this.#width = width;
        this.#height = height;
        this.angle = 0;
        // this.x = 0;
        // this.y = 0;
    }
    #draw(x, y) {
        const length = 300;
        // x, y vars are starting pos of where we want to start drawing are line beginPath method tells are canvas we want to start drawing a new shape
        this.#ctx.beginPath();
        // moveTo tells are canvas where we want to start are shape think move start to pos
        this.#ctx.moveTo(x, y);
        // lineTo method tells canvas where to draw to we go from are starting pos to are new lineTo pos can be called many times to draw complex shapes
        // just a idea but if you run this and feed it its last ending pos using multipul lineTos you could draw more complex shapes
        // this.#ctx.lineTo(x + length, y + length);
        this.#ctx.lineTo(mouse.x, mouse.y);
        // stroke method tells canvas to draw the shape mapped using the above methods moveTo lineTo mapping / stroke drawing
        this.#ctx.stroke();
    }
    animate() {
        this.angle += 0.1;
        // clreaRect method clears spesified area of canvas pos pos pos pos like 2d minecraft fill comand
        this.#ctx.clearRect(0, 0, this.#width, this.#height); //here we are clearing the full canvas on every loop iteration
        this.#draw(this.#width/2, this.#height/2);
        // --- this.#draw(this.#width/2 + Math.sin(this.angle) * 50, this.#height/2 + Math.cos(this.angle) * 50);
        // sin I think are radiens has somthing to do with are radius math -_-
        console.log('animating');
        flowFieldAnimation = requestAnimationFrame(this.animate.bind(this));
        // movement to show animation is working >>>
        // this.#draw(this.x, this.y); // sets draw map start pos to this.positions currently
        // here we change the this.positions after maping the start pos so every loop the map starting
        // point will change to the last point +0.5 and so on effefctivly creating movment
        // this.x += 0.5; // this.y += 2.5;
        // console.log('animating');
        // reqAnimationFrame method takes the funciton you want to call as arg feeding it the parent function will create  a forever loop
        // this keyword represents flowObject bind methoed tells are animate to remember this for next loop
        // we do this cuz when we create the forever loop we are isolated to animate and this is no longer
        // a representation fo are flowObject but now we bind this to this every loop keeping it from forgeting what this represents
        // flowFieldAnimation = requestAnimationFrame(this.animate.bind(this));
    }
}

// renderer.js
// "use strict";

// const { ipcRenderer } = require("electron");

// const canvas = document.getElementById('myCanvas');
// const ctx = canvas.getContext('2d');

// function updateCanvasSize(width, height) {
//     canvas.width = width;
//     canvas.height = height;

//     ctx.fillStyle = 'red';
//     ctx.fillRect(0, 0, 50, 50);

//     drawRelative();
// }

// ipcRenderer.on('window-resize', (event, { width, height }) => {
//     updateCanvasSize(width, height);
// });

// function drawRelative() {

//     ctx.fillStyle = 'blue';
//     ctx.fillRect(50, 50, 100, 100);

//     // Get the current size of the canvas
//     const canvasWidth = canvas.width;
//     const canvasHeight = canvas.height;

//     // Set the coordinates and dimensions relative to the canvas size
//     const rectangleX = canvasWidth * 0.2;
//     const rectangleY = canvasHeight * 0.3;
//     const rectangleWidth = canvasWidth * 0.6;
//     const rectangleHeight = canvasHeight * 0.4;

//     // Draw a rectangle using the calculated coordinates and dimensions
//     ctx.fillStyle = 'blue';
//     ctx.fillRect(rectangleX, rectangleY, rectangleWidth, rectangleHeight);
// }

// // ctx.fillStyle = 'blue';
// // ctx.fillRect(50, 50, 100, 100);
