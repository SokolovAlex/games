(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = function (tank) {

    var keyboard = require('./keyboard.js');

    var sprite = tank.sprite;

    //Capture the keyboard arrow keys
    var left = keyboard(37),
        up = keyboard(38),
        right = keyboard(39),
        down = keyboard(40);

    //Left arrow key `press` method
    left.press = function () {

        //Change the tbody's velocity when the key is pressed
        sprite.vx = -5;
        sprite.vy = 0;
    };

    //Left arrow key `release` method
    left.release = function () {

        //If the left arrow has been released, and the right arrow isn't down,
        //and the tbody isn't moving vertically:
        //Stop the tbody
        if (!right.isDown && sprite.vy === 0) {
            sprite.vx = 0;
        }
    };

    //Up
    up.press = function () {
        sprite.vy = -5;
        sprite.vx = 0;
    };
    up.release = function () {
        if (!down.isDown && sprite.vx === 0) {
            sprite.vy = 0;
        }
    };

    //Right
    right.press = function () {

        sprite.x += 5;

        //tbody.vx = 5;
        //tbody.vy = 0;
    };
    right.release = function () {
        if (!left.isDown && sprite.vy === 0) {
            sprite.vx = 0;
        }
    };

    //Down
    down.press = function () {
        sprite.vy = 5;
        sprite.vx = 0;
    };
    down.release = function () {
        if (!up.isDown && sprite.vx === 0) {
            sprite.vy = 0;
        }
    };
};

},{"./keyboard.js":2}],2:[function(require,module,exports){
"use strict";

module.exports = function (keyCode) {
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
};

},{}],3:[function(require,module,exports){
'use strict';

//Aliases
var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;

var Tank = require('./tank.js');
var controller = require('./controller.js');

var tank = Tank('t44');

controller(tank);

var renderer = new PIXI.CanvasRenderer(800, 500, { backgroundColor: 'green' }); //0x1099bb

$('.stage')[0].appendChild(renderer.view);

var stage = new PIXI.Stage();

stage.addChild(tank.sprite);

var draw = function draw() {
    renderer.render(stage);
    requestAnimationFrame(draw);
};

draw();

},{"./controller.js":1,"./tank.js":4}],4:[function(require,module,exports){
'use strict';

var Tank = function Tank(tankName) {
    var image_folder = '/Areas/PixiGames/Images/';

    var tankTexture = PIXI.Texture.fromImage('' + image_folder + tankName + '_body.png');
    var tankHeadTexture = PIXI.Texture.fromImage('' + image_folder + tankName + '_head.png');

    var tbody = new PIXI.Sprite(tankTexture);
    tbody.y = window.innerHeight / 2 - 150;

    var thead = new PIXI.Sprite(tankHeadTexture);
    thead.y = window.innerHeight / 2 - 150;

    var tank = new PIXI.Container();

    tank.addChild(tbody);
    tank.addChild(thead);

    var ratio = 0.2;
    tbody.scale.x = ratio;
    tbody.scale.y = ratio;
    thead.scale.x = ratio;
    thead.scale.y = ratio;

    return {
        sprite: tank
    };
};
module.exports = Tank;

},{}]},{},[3]);
