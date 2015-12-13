"use strict";

var image_folder = '/Areas/PixiGames/Images/';
//Aliases
var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;

function keyboard(keyCode) {
    var key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = function (event) {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
        }
        event.preventDefault();
    };

    //The `upHandler`
    key.upHandler = function (event) {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
        }
        event.preventDefault();
    };

    //Attach event listeners
    window.addEventListener("keydown", key.downHandler.bind(key), false);
    window.addEventListener("keyup", key.upHandler.bind(key), false);
    return key;
}

var renderer = new PIXI.CanvasRenderer(800, 500, { backgroundColor: 0x1099bb });

$('.stage')[0].appendChild(renderer.view);

var stage = new PIXI.Stage();
var tankTexture = PIXI.Texture.fromImage(image_folder + "t44_body.png");
var tankHeadTexture = PIXI.Texture.fromImage(image_folder + "t44_head.png");

var tbody = new PIXI.Sprite(tankTexture);
tbody.y = window.innerHeight / 2 - 150;

var thead = new PIXI.Sprite(tankHeadTexture);
thead.y = window.innerHeight / 2 - 150;

var ratio = 0.2;
tbody.scale.x = ratio;
tbody.scale.y = ratio;
thead.scale.x = ratio;
thead.scale.y = ratio;

stage.addChild(tbody);
stage.addChild(thead);

//Capture the keyboard arrow keys
var left = keyboard(37),
    up = keyboard(38),
    right = keyboard(39),
    down = keyboard(40);

//Left arrow key `press` method
left.press = function () {

    //Change the tbody's velocity when the key is pressed
    tbody.vx = -5;
    tbody.vy = 0;
};

//Left arrow key `release` method
left.release = function () {

    //If the left arrow has been released, and the right arrow isn't down,
    //and the tbody isn't moving vertically:
    //Stop the tbody
    if (!right.isDown && tbody.vy === 0) {
        tbody.vx = 0;
    }
};

//Up
up.press = function () {
    debugger;

    tbody.vy = -5;
    tbody.vx = 0;
};
up.release = function () {
    if (!down.isDown && tbody.vx === 0) {
        tbody.vy = 0;
    }
};

//Right
right.press = function () {

    tbody.x += 5;

    //tbody.vx = 5;
    //tbody.vy = 0;
};
right.release = function () {
    if (!left.isDown && tbody.vy === 0) {
        tbody.vx = 0;
    }
};

//Down
down.press = function () {
    tbody.vy = 5;
    tbody.vx = 0;
};
down.release = function () {
    if (!up.isDown && tbody.vx === 0) {
        tbody.vy = 0;
    }
};

var draw = function draw() {
    renderer.render(stage);
    requestAnimationFrame(draw);
};

draw();