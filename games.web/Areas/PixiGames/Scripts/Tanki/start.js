const image_folder = 'Areas/PixGames/Images/';

var renderer = new PIXI.CanvasRenderer(window.innerWidth, window.innerHeight);

$('.stage')[0].appendChild(renderer.view);

var stage = new PIXI.Stage;
var tankTexture = PIXI.Texture.fromImage('${image_folder}t44_body.png');
var zombie = new PIXI.Sprite(tankTexture);
zombie.position.x = window.innerWidth / 2 - 150;
zombie.position.y = window.innerHeight / 2 - 150;

stage.addChild(zombie);

var draw = () => {
    renderer.render(stage);
    requestAnimationFrame(draw);
}

draw();