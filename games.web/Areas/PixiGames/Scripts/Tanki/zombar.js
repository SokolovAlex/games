import * as utils from './utils';

class Zombar {
    constructor() {
        var config = require('./settings'),
            width = config.stage_size.width,
            height = config.stage_size.height;

        var pos = utils.randomPosition(width, height);
        var x = pos.x,
            y = pos.y,
            dir = pos.dir;

        this.sprite = PIXI.Sprite.fromImage(`${config.image_folder}zombie.png`);
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;

        this.sprite.x = x;
        this.sprite.y = y;

        var speed = utils.getRandom(1, 2);

        this.dx = speed * Math.cos(dir);
        this.dy = speed * Math.sin(dir);
    }
    move() {
        this.sprite.x += this.dx;
        this.sprite.y += this.dy;
    }
    getCorners() {
        var x = this.sprite.x,
            y = this.sprite.y,
            halfwidth = this.sprite.width / 2,
            halfheight = this.sprite.height / 2;

        return {
            ne: {
                x: x - halfwidth,
                y: y + halfheight
                },
            se: {
                x: x + halfwidth,
                y: y - halfheight
            },
            nw: {
                x: x - halfwidth,
                y: y - halfheight
            },
            sw: {
                x: x + halfwidth,
                y: y + halfheight
            }
        };
    }
    destruct() {

    }
}

module.exports = Zombar;