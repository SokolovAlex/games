var Tank = require('./tank'),
    controller = require('./controller'),
    Zombar = require('./zombar'),
    config = require('./settings');

import * as renderer from "./stage";

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

setInterval(() => speed_display.text(tank.speed.toFixed(2)), 100);

setInterval(() => {
    var newZombar = new Zombar();
    stage.moveble.push(newZombar);
    stage.addChild(newZombar.sprite);
}, 1000);

draw();