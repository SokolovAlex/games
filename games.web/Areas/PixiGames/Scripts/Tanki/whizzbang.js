class Whizzbang {
    constructor(opt) {
        var config = require('./settings');
        var texture = PIXI.Texture.fromImage(`${config.image_folder}shell.png`);

        this.sprite = new PIXI.Sprite(texture);
        this.sprite.x = opt.x;
        this.sprite.y = opt.y;

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
    }
    destruct() {

    }
}

module.exports = Whizzbang;