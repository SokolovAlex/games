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
        whitespace = keyboard(32);

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
        return tank.brotate = 1;
    };
    left.release = function () {
        return tank.brotate = 0;
    };

    forward.press = function () {
        return tank.moveForward = true;
    };
    forward.release = function () {
        return tank.moveForward = false;
    };

    right.press = function () {
        return tank.brotate = -1;
    };
    right.release = function () {
        return tank.brotate = 0;
    };

    back.press = function () {
        return tank.moveBack = true;
    };
    back.release = function () {
        return tank.moveBack = false;
    };

    whitespace.press = function () {
        var whizzbang = tank.shoot();
        if (whizzbang) {
            stage.shells.push(whizzbang);
            stage.addChild(whizzbang.sprite);
        }
    };
};

},{"./keyboard.js":3}],2:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var stage;
var config = require('./settings');
var id = 0;

PIXI.loader.add('spritesheet', config.image_folder + 'SpriteSheet.json').load(onAssetsLoaded);

var explosionTextures = [];

function onAssetsLoaded() {
    for (var i = 0; i < 26; i++) {
        var texture = PIXI.Texture.fromFrame('Explosion_Sequence_A ' + (i + 1) + '.png');
        explosionTextures.push(texture);
    }
}

var Explosion = (function () {
    function Explosion(opt) {
        _classCallCheck(this, Explosion);

        var movie = new PIXI.extras.MovieClip(explosionTextures);
        movie.position.x = opt.x;
        movie.position.y = opt.y;
        movie.anchor.x = 0.5;
        movie.anchor.y = 0.5;
        movie.gotoAndPlay(10);
        movie.loop = false;
        movie.scale.x = 0.5;
        movie.scale.y = 0.5;
        movie.z = 0;
        this.movie = movie;
    }

    _createClass(Explosion, [{
        key: 'destruct',
        value: function destruct() {}
    }]);

    return Explosion;
})();

module.exports = Explosion;

},{"./settings":4}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
'use strict';

module.exports = {
    image_folder: '/Areas/PixiGames/Images/',
    textures_folder: '/Areas/PixiGames/Images/Textures/',
    stage_size: {
        width: 800,
        height: 500
    }
};

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.prepareStage = prepareStage;
exports.render = render;
var renderer;

function prepareStage() {
    var config = require('./settings');

    renderer = new PIXI.CanvasRenderer(config.stage_size.width, config.stage_size.height, { backgroundColor: 0x603a00 });
    $('.stage')[0].appendChild(renderer.view);
    var stage = new PIXI.Stage();

    var stage_texture = PIXI.Sprite.fromImage(config.textures_folder + 'ground1.jpg');
    stage_texture.z = -10;
    stage_texture.width = config.stage_size.width;
    stage_texture.height = config.stage_size.height;
    stage.addChild(stage_texture);

    return stage;
}

function render(stage) {
    renderer.render(stage);
}

},{"./settings":4}],6:[function(require,module,exports){
'use strict';

var _stage = require('./stage');

var renderer = _interopRequireWildcard(_stage);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var Tank = require('./tank'),
    controller = require('./controller'),
    Zombar = require('./zombar'),
    Whizzbang = require('./whizzbang.js'),
    config = require('./settings');

var stage = renderer.prepareStage();

var speed_display = $('#speed_display'),
    reloading_display = $('#reloading_display'),
    points_display = $('#points_display');

var tank = Tank('t44', stage);

stage.shells = [];
stage.zombies = [];
controller(tank, stage);

stage.addChild(tank.sprite);

var draw = function draw() {
    renderer.render(stage);
    requestAnimationFrame(draw);

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = stage.shells[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            item.move();
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = stage.zombies[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var zombie = _step2.value;

            zombie.move();
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    tank.move();
    tank.checkKill(stage.zombies, stage.shells);
};

setInterval(function () {
    speed_display.text(tank.speed.toFixed(2));
    points_display.text(tank.points);
    if (tank.reloading) {
        var time = 3000 - (new Date() - tank.shootTime);
        time = time / 1000;
        reloading_display.css('background-color', 'red');
        reloading_display.text(time);
    } else {
        reloading_display.css('background-color', 'green');
        reloading_display.text(3.0);
    }
}, 100);

Zombar.setStage(stage);
Whizzbang.setStage(stage);

setInterval(function () {
    var newZombar = new Zombar();
    stage.zombies.push(newZombar);
    stage.addChild(newZombar.sprite);
}, 300);

//var newZombar = new Zombar({x: 300,y:300,speed:0.1,dir:-Math.PI/2});
//stage.zombies.push(newZombar);
//stage.addChild(newZombar.sprite);

draw();

},{"./controller":1,"./settings":4,"./stage":5,"./tank":7,"./whizzbang.js":9,"./zombar":10}],7:[function(require,module,exports){
'use strict';

var Tank = function Tank(tankName, stage) {
    var Whizzbang = require('./whizzbang'),
        Explosion = require('./explosion'),
        config = require('./settings');

    var tankTexture = PIXI.Texture.fromImage('' + config.image_folder + tankName + '_body.png');
    var tankHeadTexture = PIXI.Texture.fromImage('' + config.image_folder + tankName + '_head.png');

    var tbody = new PIXI.Sprite(tankTexture);
    var thead = new PIXI.Sprite(tankHeadTexture);
    var sprite = new PIXI.Container();

    sprite.y = 200;
    sprite.x = 200;
    sprite.z = 10;

    tbody.anchor.x = 0.5;
    tbody.anchor.y = 0.5;
    thead.anchor.x = 0.5;
    thead.anchor.y = 0.5;

    thead.pivot.set(-50, 0);

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
    var trunk_length = 50;
    var whizzbang_speed = 5,
        reloadTime = 3 * 1000;

    var width, height, gip, atan;
    var loaded = false;
    tbody.texture.baseTexture.on('loaded', function () {
        loaded = true;
        width = tbody.width * ratio;
        height = tbody.height * ratio;
        atan = Math.atan(height / width);
        gip = Math.sqrt(width * width / 4 + height * height / 4);
    });

    var cornerPoint1, cornerPoint2, cornerPoint3, cornerPoint4;

    var tank = {
        sprite: sprite,
        points: 0,
        speed: 0,
        reloading: false,
        shoot: function shoot() {
            if (tank.reloading) {
                return;
            }
            var direction = sprite.rotation + thead.rotation;

            var x = sprite.x + Math.cos(direction) * trunk_length;
            var y = sprite.y + Math.sin(direction) * trunk_length;

            var exp = new Explosion({ x: x, y: y });

            stage.addChild(exp.movie);

            var whizzbang = new Whizzbang({
                x: x,
                y: y,
                direction: direction,
                speed: whizzbang_speed
            });

            tank.reloading = true;
            tank.shootTime = new Date();

            setTimeout(function () {
                return tank.reloading = false;
            }, reloadTime);

            return whizzbang;
        },
        move: function move() {
            var dx = 0,
                dy = 0,
                dr = 0;

            if (tank.hrotate) {
                thead.rotation += tank.hrotate * hrorate_speed;
            }

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
                dx = tank.speed * Math.cos(sprite.rotation);
                dy = tank.speed * Math.sin(sprite.rotation);
                sprite.x += dx;
                sprite.y += dy;
            }

            if (tank.brotate) {
                dr = res * tank.brotate * rotate_speed;
                sprite.rotation += dr;
            }

            if (tank.collision()) {
                sprite.x -= dx;
                sprite.y -= dy;
                sprite.rotation -= dr;
                tank.speed = 0;
                return;
            }
        },
        collision: function collision() {
            if (!loaded) {
                return false;
            }

            var dir1 = sprite.rotation + atan;
            var dir2 = sprite.rotation - atan;

            cornerPoint1 = {
                x: sprite.x + gip * Math.cos(dir1),
                y: sprite.y + gip * Math.sin(dir1)
            };

            cornerPoint2 = {
                x: sprite.x + gip * Math.cos(dir2),
                y: sprite.y + gip * Math.sin(dir2)
            };

            cornerPoint3 = {
                x: sprite.x - gip * Math.cos(dir1),
                y: sprite.y - gip * Math.sin(dir1)
            };

            cornerPoint4 = {
                x: sprite.x - gip * Math.cos(dir2),
                y: sprite.y - gip * Math.sin(dir2)
            };

            tank.a1 = cornerPoint1.x === cornerPoint2.x ? false : (cornerPoint1.y - cornerPoint2.y) / (cornerPoint1.x - cornerPoint2.x);
            tank.a2 = cornerPoint1.x === cornerPoint4.x ? false : (cornerPoint1.y - cornerPoint4.y) / (cornerPoint1.x - cornerPoint4.x);

            if (tank.a1 !== false) {
                var b1 = -cornerPoint1.x * tank.a1 + cornerPoint1.y;
                var b2 = -cornerPoint3.x * tank.a1 + cornerPoint3.y;
                tank.maxb1 = Math.max(b1, b2);
                tank.minb1 = Math.min(b1, b2);
            }

            if (tank.a2 !== false) {
                var b3 = -cornerPoint1.x * tank.a2 + cornerPoint1.y;
                var b4 = -cornerPoint3.x * tank.a2 + cornerPoint3.y;
                tank.maxb2 = Math.max(b3, b4);
                tank.minb2 = Math.min(b3, b4);
            }

            if (cornerPoint1.x < 0 || cornerPoint2.x < 0 || cornerPoint1.y < 0 || cornerPoint2.y < 0) {
                return true;
            }

            if (cornerPoint1.x > config.stage_size.width || cornerPoint2.x > config.stage_size.width || cornerPoint1.y > config.stage_size.height || cornerPoint2.y > config.stage_size.height) {
                return true;
            }

            if (cornerPoint3.x < 0 || cornerPoint4.x < 0 || cornerPoint3.y < 0 || cornerPoint4.y < 0) {
                return true;
            }

            if (cornerPoint3.x > config.stage_size.width || cornerPoint4.x > config.stage_size.width || cornerPoint3.y > config.stage_size.height || cornerPoint4.y > config.stage_size.height) {
                return true;
            }

            return false;
        },
        checkKill: function checkKill(enemies, shells) {
            _.each(enemies, function (enemy, i) {
                var corners = enemy.getCorners();
                for (var key in corners) {
                    var corner = corners[key];
                    var b1 = -tank.a1 * corner.x + corner.y;
                    var b2 = -tank.a2 * corner.x + corner.y;
                    if (b1 < tank.maxb1 && b1 > tank.minb1 && b2 < tank.maxb2 && b2 > tank.minb2) {
                        enemy.dead();
                        tank.points = tank.points + 2;
                        return;
                    }
                }

                _.each(shells, function (shell) {
                    var x = shell.sprite.x;
                    var y = shell.sprite.y;
                    if (x > corners.nw.x && x < corners.ne.x && y > corners.nw.y && y < corners.sw.y) {
                        enemy.dead();
                        shell.destruct();
                        tank.points = tank.points + 10;
                        return;
                    }
                });
            });
        }
    };

    tank.move();

    return tank;
};
module.exports = Tank;

},{"./explosion":2,"./settings":4,"./whizzbang":9}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getRandom = getRandom;
exports.depthCompare = depthCompare;
exports.randomPosition = randomPosition;
var getRandom = function getRandom(min, max) {
    return Math.random() * (max - min) + min;
};

function getRandom(min, max) {
    return getRandom(min, max);
};

function depthCompare(a, b) {
    if (a.z < b.z) return -1;
    if (a.z > b.z) return 1;
    return 0;
};

function randomPosition(width, height) {
    var pi = Math.PI;
    var r = Math.random();
    var x, y, dir;

    if (r > 0.75) {
        x = width + 10;
        y = Math.random() * height;
        dir = getRandom(pi / 2, pi * 3 / 2);
    } else if (r > 0.5) {
        x = -10;
        y = Math.random() * height;
        dir = getRandom(-pi / 2, pi / 2);
    } else if (r > 0.25) {
        y = -10;
        x = Math.random() * width;
        dir = getRandom(0, pi);
    } else {
        y = height + 10;
        x = Math.random() * width;
        dir = getRandom(pi, 2 * pi);
    }
    return { x: x, y: y, dir: dir };
};

},{}],9:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var stage;
var config = require('./settings');
var texture = PIXI.Texture.fromImage(config.image_folder + 'shell.png');
var id = 0;

var Whizzbang = (function () {
    _createClass(Whizzbang, null, [{
        key: 'setStage',
        value: function setStage(_stage) {
            stage = _stage;
        }
    }]);

    function Whizzbang(opt) {
        _classCallCheck(this, Whizzbang);

        this.sprite = new PIXI.Sprite(texture);
        this.sprite.x = opt.x;
        this.sprite.y = opt.y;
        this.id = id++;

        var ratio = 0.2;
        this.sprite.scale.x = ratio;
        this.sprite.scale.y = ratio;

        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;

        var speed = opt.speed,
            direction = opt.direction;
        this.dx = speed * Math.cos(direction);
        this.dy = speed * Math.sin(direction);
        this.sprite.rotation = direction;
    }

    _createClass(Whizzbang, [{
        key: 'move',
        value: function move() {
            this.sprite.x += this.dx;
            this.sprite.y += this.dy;

            var w = config.stage_size.width;
            var h = config.stage_size.height;
            var precision = 10;

            if (this.sprite.x > w + precision || this.sprite.x < -precision || this.sprite.y > h + precision || this.sprite.y < -precision) {
                this.destruct();
            }
        }
    }, {
        key: 'destruct',
        value: function destruct() {
            var self = this;
            stage.removeChild(this.sprite);
            stage.shells = _.reject(stage.shells, function (z) {
                return z.id == self.id;
            });
        }
    }]);

    return Whizzbang;
})();

module.exports = Whizzbang;

},{"./settings":4}],10:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var config = require('./settings');
var deadTexture = PIXI.Texture.fromImage(config.image_folder + 'blood.png');
var id = 0;
var stage;

var Zombar = (function () {
    _createClass(Zombar, null, [{
        key: 'setStage',
        value: function setStage(_stage) {
            stage = _stage;
        }
    }]);

    function Zombar(options) {
        _classCallCheck(this, Zombar);

        options = options || {};

        this.id = id++;

        var width = config.stage_size.width,
            height = config.stage_size.height;

        var pos;
        if (options.x && options.y && options.dir) {
            pos = options;
        } else {
            pos = utils.randomPosition(width, height);
        }

        var x = pos.x,
            y = pos.y,
            dir = pos.dir;

        this.sprite = PIXI.Sprite.fromImage(config.image_folder + 'zombie.png');
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;

        this.sprite.z = 1;

        this.sprite.x = x;
        this.sprite.y = y;

        var speed;
        if (options.speed !== undefined) {
            speed = options.speed;
        } else {
            speed = utils.getRandom(1, 2);
        }

        this.dx = speed * Math.cos(dir);
        this.dy = speed * Math.sin(dir);

        stage.children.sort(utils.depthCompare);
    }

    _createClass(Zombar, [{
        key: 'move',
        value: function move() {
            this.sprite.x += this.dx;
            this.sprite.y += this.dy;
            var w = config.stage_size.width;
            var h = config.stage_size.height;
            var precision = 40;

            if (this.sprite.x > w + precision || this.sprite.x < -precision || this.sprite.y > h + precision || this.sprite.y < -precision) {
                this.dead();
            }
        }
    }, {
        key: 'dead',
        value: function dead() {
            var self = this;
            this.sprite.texture = deadTexture;
            this.sprite.z = -1;
            stage.zombies = _.reject(stage.zombies, function (z) {
                return z.id == self.id;
            });
        }
    }, {
        key: 'getCorners',
        value: function getCorners() {
            var x = this.sprite.x,
                y = this.sprite.y,
                halfwidth = this.sprite.width / 2,
                halfheight = this.sprite.height / 2;

            return {
                ne: {
                    x: x + halfwidth,
                    y: y + halfheight
                },
                se: {
                    x: x + halfwidth / 2,
                    y: y - halfheight
                },
                w: {
                    x: x - halfwidth,
                    y: y
                },
                e: {
                    x: x + halfwidth,
                    y: y
                },
                n: {
                    x: x,
                    y: y - halfheight
                },
                nw: {
                    x: x - halfwidth / 2,
                    y: y - halfheight
                },
                sw: {
                    x: x - halfwidth,
                    y: y + halfheight
                }
            };
        }
    }]);

    return Zombar;
})();

module.exports = Zombar;

},{"./settings":4,"./utils":8}]},{},[6]);
