var Tank = require('./tank.js');
var controller = require('./controller.js'),
    config = require('./settings');

var renderer = new PIXI.CanvasRenderer(800, 500, { backgroundColor: 0x603a00 });

$('.stage')[0].appendChild(renderer.view);

var stage = new PIXI.Stage;
var speed_display = $('#speed_display');

var stage_texture = PIXI.Sprite.fromImage(`${config.textures_folder}ground1.jpg`);
stage_texture.width = 800;
stage_texture.height = 500;

stage.addChild(stage_texture);

var tank = Tank('t44');

stage.moveble = [];
controller(tank, stage);

stage.addChild(tank.sprite);

var draw = () => {
    renderer.render(stage);
    requestAnimationFrame(draw);
    tank.move();

    for (var item of stage.moveble) {
        item.move();
    }
}

setInterval(() => speed_display.text(tank.speed.toFixed(2)), 100)

draw();