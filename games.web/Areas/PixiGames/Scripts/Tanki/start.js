var Tank = require('./tank'),
    controller = require('./controller'),
    Zombar = require('./zombar'),
    Whizzbang = require('./whizzbang.js'),
    config = require('./settings');

import * as renderer from "./stage";

var stage = renderer.prepareStage();


function state_play(){
    
}
 
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

function startGame() {    
    Zombar.setStage(stage);
    Whizzbang.setStage(stage);

    var speed_display = $('#speed_display'),
    reloading_display = $('#reloading_display'),
    time_display = $('#time_display'),
    points_display = $('#points_display');

    var tank = Tank('t44', stage);

    controller(tank, stage);

    stage.addChild(tank.sprite);

    stage.shells = [];
    stage.zombies = [];

    var startTime = new Date();
    setInterval(() => {
        speed_display.text(tank.speed.toFixed(2));
        points_display.text(tank.points);
        var now = new Date();

        var timeleft = 60 * 1000 - ( now - startTime);
        time_display.text(timeleft/1000);

        if(tank.reloading) {
            var time = 1000 - ( now - tank.shootTime);
            time = time/1000;
            reloading_display.css('background-color', 'red');
            reloading_display.text(time);
        } else {
            reloading_display.css('background-color', 'green');
            reloading_display.text(1.0);
        }
    }, 100);
}


setInterval(() => {
    var newZombar = new Zombar();
    stage.zombies.push(newZombar);
    stage.addChild(newZombar.sprite);
}, 300);

//var newZombar = new Zombar({x: 300,y:300,speed:0.1,dir:-Math.PI/2});
//stage.zombies.push(newZombar);
//stage.addChild(newZombar.sprite);

draw();