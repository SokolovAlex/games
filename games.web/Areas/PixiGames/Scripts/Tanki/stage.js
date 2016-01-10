var renderer;
var config = require('./settings');

export function prepareStage() {
    renderer = new PIXI.CanvasRenderer(config.stage_size.width, config.stage_size.height, { backgroundColor: 0x603a00 });
    $('.stage')[0].appendChild(renderer.view);
    var stage = new PIXI.Stage;

    var stage_texture = PIXI.Sprite.fromImage(`${config.textures_folder}ground1.jpg`);
    stage_texture.z = -10;
    stage_texture.width = config.stage_size.width;
    stage_texture.height = config.stage_size.height;
    stage.addChild(stage_texture);

    return stage;
}

export function prepareMenu(stage, onStart) {
    var menu_texture = PIXI.Sprite.fromImage(`${config.image_folder}menu.jpg`);
    menu_texture.width = config.stage_size.width;
    menu_texture.height = config.stage_size.height;

    var btnTexture = PIXI.Texture.fromImage(`${config.image_folder}start.png`);
    var pressedTexture = PIXI.Texture.fromImage(`${config.image_folder}start_pressed.png`);

    var startBtn = new PIXI.Sprite(btnTexture);
    startBtn.interactive = true;

    startBtn.on('mouseover', () => startBtn.texture = pressedTexture);

    startBtn.on('mouseout', () => startBtn.texture = btnTexture);

    startBtn.on('click', () => {
        stage.removeChild(startBtn);
        stage.removeChild(menu_texture);
        stage.removeChild(sprite);
        onStart();
    });

    startBtn.x = 550;
    startBtn.y = 350;

    stage.addChild(menu_texture);
    stage.addChild(startBtn);

    var tankTexture = PIXI.Texture.fromImage(`${config.image_folder}t44_body.png`);
    var tankHeadTexture = PIXI.Texture.fromImage(`${config.image_folder}t44_head.png`);

    var tbody = new PIXI.Sprite(tankTexture);
    var thead = new PIXI.Sprite(tankHeadTexture);
    var sprite = new PIXI.Container();

    sprite.y = 400;
    sprite.x = 450;

    tbody.anchor.x = 0.5;
    tbody.anchor.y = 0.5;
    thead.anchor.x = 0.5;
    thead.anchor.y = 0.5;

    var ratio = 0.2;
    sprite.scale.x = ratio;
    sprite.scale.y = ratio;

    thead.pivot.set(-50, 0);

    sprite.addChild(tbody);
    sprite.addChild(thead);

    stage.addChild(sprite);
}

export function render(stage) {
    renderer.render(stage);
}