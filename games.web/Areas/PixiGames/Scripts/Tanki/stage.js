var renderer;

export function prepareStage() {
    var config = require('./settings');

    renderer = new PIXI.CanvasRenderer(config.stage_size.width, config.stage_size.height, { backgroundColor: 0x603a00 });
    $('.stage')[0].appendChild(renderer.view);
    var stage = new PIXI.Stage;

    var stage_texture = PIXI.Sprite.fromImage(`${config.textures_folder}ground1.jpg`);
    stage_texture.width = config.stage_size.width;
    stage_texture.height = config.stage_size.height;
    stage.addChild(stage_texture);

    return stage;
}

export function render(stage) {
    renderer.render(stage);
}