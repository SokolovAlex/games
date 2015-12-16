module.exports = function(tank) {
    var keyboard = require('./keyboard.js');

    var left = keyboard(65),
        forward = keyboard(87),
        right = keyboard(68),
        back = keyboard(83),
        hleft = keyboard(37),
        hright = keyboard(39);

    hleft.press = function () {
        tank.hrotate = 1;
    };

    hleft.release = function () {
        tank.hrotate = 0;
    };

    hright.press = function () {
        tank.hrotate = -1;
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
}
