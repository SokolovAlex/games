(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = function (tank, stage) {
    var keyboard = require('./keyboard.js');

    var left = keyboard(65),
        forward = keyboard(87),
        right = keyboard(68),
        back = keyboard(83),
        hleft = keyboard(37),
        hright = keyboard(39),
        shout = keyboard(32);

    hleft.press = function () {
        return tank.hrotate = -1;
    };
    hleft.release = function () {
        return tank.hrotate = 0;
    };

    hright.press = function () {
        return tank.hrotate = 1;
    };
    hright.release = function () {
        return tank.hrotate = 0;
    };

    left.press = function () {
        return tank.leftRotate = true;
    };
    left.release = function () {
        return tank.leftRotate = false;
    };

    forward.press = function () {
        return tank.moveForward = true;
    };
    forward.release = function () {
        return tank.moveForward = false;
    };

    right.press = function () {
        return tank.rightRotate = true;
    };
    right.release = function () {
        return tank.rightRotate = false;
    };

    back.press = function () {
        return tank.moveBack = true;
    };
    back.release = function () {
        return tank.moveBack = false;
    };

    shout.press = function () {
        return stage.addChild(tank.shout());
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

module.exports = {
    image_folder: '/Areas/PixiGames/Images/'
};

},{}],4:[function(require,module,exports){
'use strict';

var Tank = require('./tank.js');
var controller = require('./controller.js');

var renderer = new PIXI.CanvasRenderer(800, 500, { backgroundColor: 0x603a00 });

$('.stage')[0].appendChild(renderer.view);

var stage = new PIXI.Stage();
var speed_display = $('#speed_display');

var tank = Tank('t44');
controller(tank, stage);

stage.addChild(tank.sprite);

var draw = function draw() {
    renderer.render(stage);
    requestAnimationFrame(draw);
    tank.move();
};

setInterval(function () {
    return speed_display.text(tank.speed.toFixed(2));
}, 100);

draw();

},{"./controller.js":1,"./tank.js":5}],5:[function(require,module,exports){
'use strict';

var Tank = function Tank(tankName) {
    var Whizzbang = require('./whizzbang.js'),
        config = require('./settings');

    var tankTexture = PIXI.Texture.fromImage('' + config.image_folder + tankName + '_body.png');
    var tankHeadTexture = PIXI.Texture.fromImage('' + config.image_folder + tankName + '_head.png');

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
    var trunk_length = 55;
    var whizzbang_speed = 25;

    var tank = {
        sprite: sprite,
        speed: 0,
        shout: function shout() {
            var direction = sprite.rotation + thead.rotation;

            var x = sprite.x + Math.cos(direction) * trunk_length;
            var y = sprite.y + Math.sin(direction) * trunk_length;

            var whizzbang = new Whizzbang({ x: x, y: y });

            whizzbang.start(whizzbang_speed, direction);

            return whizzbang.sprite;
        },
        move: function move() {
            if (tank.moveForward) {
                tank.speed += forward_accelerate;
            }

            if (tank.moveBack) {
                tank.speed -= back_accelerate;
            }

            var isForward = tank.speed > -resistance;
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
                console.log(sprite.x, sprite.y);
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

},{"./settings":3,"./whizzbang.js":6}],6:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Whizzbang = (function () {
        function Whizzbang(position) {
                _classCallCheck(this, Whizzbang);

                var config = require('./settings');
                var texture = PIXI.Texture.fromImage(config.image_folder + 'shell.png');

                this.sprite = new PIXI.Sprite(texture);
                this.sprite.x = position.x;
                this.sprite.y = position.y;

                var ratio = 0.2;
                this.sprite.scale.x = ratio;
                this.sprite.scale.y = ratio;

                this.sprite.anchor.x = 0.5;
                this.sprite.anchor.y = 0.5;
        }

        _createClass(Whizzbang, [{
                key: 'start',
                value: function start(speed, direction) {
                        var _this = this;

                        var dx = speed * Math.cos(direction);
                        var dy = speed * Math.sin(direction);

                        this.sprite.rotation = direction;

                        setInterval(function () {
                                _this.sprite.x += dx;
                                _this.sprite.y += dy;
                        }, 200);
                }
        }]);

        return Whizzbang;
})();

module.exports = Whizzbang;

},{"./settings":3}]},{},[4]);
