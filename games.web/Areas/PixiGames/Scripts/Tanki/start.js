var Tank = require('./tank.js');
var controller = require('./controller.js'),
    config = require('./settings');

import * as renderer from "./stage.js";

var stage = renderer.prepareStage();

var speed_display = $('#speed_display');

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