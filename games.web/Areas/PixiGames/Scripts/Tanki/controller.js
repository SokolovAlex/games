module.exports = function(tank, stage) {
    var keyboard = require('./keyboard.js');

    var left = keyboard(65),
        forward = keyboard(87),
        right = keyboard(68),
        back = keyboard(83),
        hleft = keyboard(37),
        hright = keyboard(39),
        whitespace = keyboard(32);

    hleft.press = () => tank.hrotate = -1;
    hleft.release = () => tank.hrotate = 0;

    hright.press = () => tank.hrotate = 1;
    hright.release = () => tank.hrotate = 0;

    left.press = () => tank.brotate = 1;
    left.release = () => tank.brotate = 0;

    forward.press = () => tank.moveForward = true;
    forward.release = () => tank.moveForward = false;

    right.press = () =>  tank.brotate = -1;
    right.release = () => tank.brotate = 0;

    back.press = () => tank.moveBack = true;
    back.release = () => tank.moveBack = false;

    whitespace.press = () => {
        var whizzbang = tank.shoot();
        stage.shells.push(whizzbang);
        stage.addChild(whizzbang.sprite);
    }
}
