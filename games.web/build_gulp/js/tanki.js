(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = function (tank) {
    var keyboard = require('./keyboard.js');

    var left = keyboard(65),
        forward = keyboard(87),
        right = keyboard(68),
        back = keyboard(83),
        hleft = keyboard(37),
        hright = keyboard(39);

    hleft.press = function () {
        tank.hrotate = -1;
    };

    hleft.release = function () {
        tank.hrotate = 0;
    };

    hright.press = function () {
        tank.hrotate = 1;
    };

    hright.release = function () {
        tank.hrotate = 0;
    };

    left.press = function () {
        tank.leftRotate = true;
    };

    left.release = function () {
        tank.leftRotate = false;
    };

    forward.press = function () {
        tank.moveForward = true;
    };

    forward.release = function () {
        tank.moveForward = false;
    };

    right.press = function () {
        tank.rightRotate = true;
    };
    right.release = function () {
        tank.rightRotate = false;
    };
    back.press = function () {
        tank.moveBack = true;
    };
    back.release = function () {
        tank.moveBack = false;
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

    key.downHandler = function (event) {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
        }
        event.preventDefault();
    };

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

var Tank = require('./tank.js');
var controller = require('./controller.js');

var tank = Tank('t44');

controller(tank);

var renderer = new PIXI.CanvasRenderer(800, 500, { backgroundColor: 0x603a00 });

$('.stage')[0].appendChild(renderer.view);

var stage = new PIXI.Stage();

stage.addChild(tank.sprite);

var speed_display = $('#speed_display');

var draw = function draw() {
    renderer.render(stage);
    requestAnimationFrame(draw);
    tank.move();
};

setInterval(function () {
    return speed_display.text(tank.speed.toFixed(2));
}, 100);

draw();

},{"./controller.js":1,"./tank.js":4}],4:[function(require,module,exports){
'use strict';

var Tank = function Tank(tankName) {
    var image_folder = '/Areas/PixiGames/Images/';

    var tankTexture = PIXI.Texture.fromImage('' + image_folder + tankName + '_body.png');
    var tankHeadTexture = PIXI.Texture.fromImage('' + image_folder + tankName + '_head.png');

    var tbody = new PIXI.Sprite(tankTexture);
    var thead = new PIXI.Sprite(tankHeadTexture);
    var sprite = new PIXI.Container();

    sprite.y = 200;
    sprite.x = 200;

    tbody.anchor.x = 0.5;
    tbody.anchor.y = 0.5;
    thead.anchor.x = 0.5;
    thead.anchor.y = 0.5;

    thead.pivot.set(-50, 0);
    thead.x = -40;

    sprite.addChild(tbody);
    sprite.addChild(thead);

    var ratio = 0.2;
    sprite.scale.x = ratio;
    sprite.scale.y = ratio;

    var rotate_speed = 0.015;
    var hrorate_speed = 0.02;
    var max_speed_forward = 2;
    var max_speed_back = -1;
    var forward_accelerate = 0.03;
    var back_accelerate = 0.02;
    var resistance = 0.01;

    var tank = {
        sprite: sprite,
        speed: 0,
        move: function move() {

            if (tank.moveForward) {
                tank.speed += forward_accelerate;
            }

            if (tank.moveBack) {
                tank.speed -= back_accelerate;
            }

            var isForward = tank.speed > resistance;
            var res = isForward ? -1 : 1;

            if (Math.abs(tank.speed) < resistance) {
                tank.speed = 0;
            } else {
                tank.speed += res * resistance;

                if (tank.speed > max_speed_forward) {
                    tank.speed = max_speed_forward;
                }

                if (tank.speed < max_speed_back) {
                    tank.speed = max_speed_back;
                }

                sprite.x += tank.speed * Math.cos(sprite.rotation);
                sprite.y += tank.speed * Math.sin(sprite.rotation);
            }

            if (tank.leftRotate) {
                sprite.rotation += res * rotate_speed;
            } else if (tank.rightRotate) {
                sprite.rotation -= res * rotate_speed;
            }

            if (tank.hrotate) {
                thead.rotation += tank.hrotate * hrorate_speed;
            }
        }
    };
    return tank;
};
module.exports = Tank;

},{}]},{},[3]);
