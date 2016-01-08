var stage;
var config = require('./settings');
var id = 0;

PIXI.loader
    .add('spritesheet', `${config.image_folder}SpriteSheet.json`)
    .load(onAssetsLoaded);

var explosionTextures = [];

function onAssetsLoaded() {
    for (var i = 0; i < 26; i++) {
        var texture = PIXI.Texture.fromFrame('Explosion_Sequence_A ' + (i + 1) + '.png');
        explosionTextures.push(texture);
    }
}

class Explosion {
    constructor(opt) {
        var movie = new PIXI.extras.MovieClip(explosionTextures);
        movie.position.x = opt.x;
        movie.position.y = opt.y;
        movie.anchor.x = 0.5;
        movie.anchor.y = 0.5;
        movie.gotoAndPlay(10);
        movie.loop = false;
        movie.scale.x = 0.5;
        movie.scale.y = 0.5;
        movie.z = 0;
        this.movie = movie;
    }
    destruct() {
    }
}

module.exports = Explosion;