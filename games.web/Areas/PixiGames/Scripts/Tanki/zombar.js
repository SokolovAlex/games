import * as utils from './utils';
var config = require('./settings');
var deadTexture = PIXI.Texture.fromImage(`${config.image_folder}blood.png`);
var id = 0;
var stage;

class Zombar {
    static setStage(_stage){
        stage = _stage;
    }
    constructor(options) {
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

        this.sprite = PIXI.Sprite.fromImage(`${config.image_folder}zombie.png`);
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
    move() {
        this.sprite.x += this.dx;
        this.sprite.y += this.dy;
        var w = config.stage_size.width;
        var h = config.stage_size.height;
        var precision = 40;

        if(this.sprite.x > w + precision || this.sprite.x < -precision
            || this.sprite.y > h + precision || this.sprite.y < -precision) {
            this.dead();
        }
    }
    dead() {
        var self = this;
        this.sprite.texture = deadTexture;
        this.sprite.z = -1;
        stage.zombies = _.reject(stage.zombies, (z) => z.id == self.id);
        stage.removeChild(this.sprite);
    }
    getCorners() {
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
                x: x + halfwidth/2,
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
                x: x - halfwidth/2,
                y: y - halfheight
            },
            sw: {
                x: x - halfwidth,
                y: y + halfheight
            }
        };
    }
}

module.exports = Zombar;