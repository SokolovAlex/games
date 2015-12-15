module.exports = function(tank) {

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
}
