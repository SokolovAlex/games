var Tank = require('./tank'),
    controller = require('./controller'),
    Zombar = require('./zombar'),
    Whizzbang = require('./whizzbang.js'),
    config = require('./settings');

import * as renderer from "./stage";

var stage = renderer.prepareStage();

var speed_display = $('#speed_display');

var tank = Tank('t44', stage);

stage.shells = [];
stage.zombies = [];
controller(tank, stage);

stage.addChild(tank.sprite);

var draw = () => {
    
    renderer.render(stage);
    requestAnimationFrame(draw);

    for (var item of stage.shells) {
        item.move();
    }
    for (var zombie of stage.zombies) {
        zombie.move();
    }
    tank.move();
    tank.checkKill(stage.zombies, stage.shells);
}

setInterval(() => speed_display.text(tank.speed.toFixed(2)), 100);

Zombar.setStage(stage);
Whizzbang.setStage(stage);

setInterval(() => {
    var newZombar = new Zombar();
    stage.zombies.push(newZombar);
    stage.addChild(newZombar.sprite);
}, 300);

//var newZombar = new Zombar({x: 300,y:300,speed:0.1,dir:-Math.PI/2});
//stage.zombies.push(newZombar);
//stage.addChild(newZombar.sprite);

draw();