
//Aliases
var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;

var Tank = require('./tank.js');
var controller = require('./controller.js');

var tank = Tank('t44');

controller(tank);

var renderer = new PIXI.CanvasRenderer(800, 500, { backgroundColor: 'green' }); //0x1099bb

$('.stage')[0].appendChild(renderer.view);

var stage = new PIXI.Stage;

stage.addChild(tank.sprite);

var draw = () => {
    renderer.render(stage);
    requestAnimationFrame(draw);
}

draw();