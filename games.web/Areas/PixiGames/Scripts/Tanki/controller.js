module.exports = function(tank, stage) {
    var keyboard = require('./keyboard.js');

    var left = keyboard(65),
        forward = keyboard(87),
        right = keyboard(68),
        back = keyboard(83),
        hleft = keyboard(37),
        hright = keyboard(39),
        shout = keyboard(32);

    hleft.press = () => tank.hrotate = -1;
    hleft.release = () => tank.hrotate = 0;

    hright.press = () => tank.hrotate = 1;
    hright.release = () => tank.hrotate = 0;

    left.press = () => tank.leftRotate = true;
    left.release = () => tank.leftRotate = false;

    forward.press = () => tank.moveForward = true;
    forward.release = () => tank.moveForward = false;

    right.press = () =>  tank.rightRotate = true;
    right.release = () => tank.rightRotate = false;

    back.press = () => tank.moveBack = true;
    back.release = () => tank.moveBack = false;

    shout.press = () => stage.addChild(tank.shout());
}
