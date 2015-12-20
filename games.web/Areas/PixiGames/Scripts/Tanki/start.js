var Tank = require('./tank.js');
var controller = require('./controller.js');

var renderer = new PIXI.CanvasRenderer(800, 500, { backgroundColor: 0x603a00 });

$('.stage')[0].appendChild(renderer.view);

var stage = new PIXI.Stage;
var speed_display = $('#speed_display');

var tank = Tank('t44');
controller(tank, stage);

stage.addChild(tank.sprite);

var draw = () => {
    renderer.render(stage);
    requestAnimationFrame(draw);
    tank.move();
}

setInterval(() => speed_display.text(tank.speed.toFixed(2)), 100)

draw();