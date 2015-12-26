let getRandom = (min, max) => {
    return Math.random() * (max - min) + min;
}

let randomPosition = (width, height) => {
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
    return {x: x, y: y, dir: dir};
}

class Zombar {
    constructor() {
        var config = require('./settings'),
            width = config.stage_size.width,
            height = config.stage_size.height;

        var pos = randomPosition(width, height);
        var x = pos.x,
            y = pos.y,
            dir = pos.dir;

        this.sprite = PIXI.Sprite.fromImage(`${config.image_folder}zombie.png`);
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;

        this.sprite.x = x;
        this.sprite.y = y;

        var speed = getRandom(1, 2);

        this.dx = speed * Math.cos(dir);
        this.dy = speed * Math.sin(dir);
    }
    move() {
        this.sprite.x += this.dx;
        this.sprite.y += this.dy;
    }
    destruct() {

    }
}

module.exports = Zombar;