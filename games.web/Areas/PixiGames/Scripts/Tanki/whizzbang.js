class Whizzbang {
    constructor(position) {
        var config = require('./settings');
        var texture = PIXI.Texture.fromImage(`${config.image_folder}shell.png`);

        this.sprite = new PIXI.Sprite(texture);
        this.sprite.x = position.x;
        this.sprite.y = position.y;

        var ratio = 0.2;
        this.sprite.scale.x = ratio;
        this.sprite.scale.y = ratio;

        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
    }
    start(speed, direction) {
        var dx = speed * Math.cos(direction);
        var dy = speed * Math.sin(direction);

        this.sprite.rotation = direction;

        setInterval(() => {
            this.sprite.x += dx;
            this.sprite.y += dy;
        }, 200);
    }
}

module.exports = Whizzbang;