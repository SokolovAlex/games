var stage;
var config = require('./settings');
var texture = PIXI.Texture.fromImage(`${config.image_folder}shell.png`);
var id = 0;

class Whizzbang {
    static setStage(_stage) {
        stage = _stage;
    }
    constructor(opt) {
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
    move() {
        this.sprite.x += this.dx;
        this.sprite.y += this.dy;

        var w = config.stage_size.width;
        var h = config.stage_size.height;
        var precision = 10;

        if (this.sprite.x > w + precision || this.sprite.x < -precision
            || this.sprite.y > h + precision || this.sprite.y < -precision) {
            this.destruct();
        }
    }
    destruct() {
        var self = this;
        stage.removeChild(this.sprite);
        stage.shells = _.reject(stage.shells, (z) => z.id == self.id);
        stage.removeChild(this.sprite);
    }
}

module.exports = Whizzbang;