var Tank = (tankName) => {
    const image_folder = '/Areas/PixiGames/Images/';
    
    var tankTexture = PIXI.Texture.fromImage(`${image_folder}${tankName}_body.png`);
    var tankHeadTexture = PIXI.Texture.fromImage(`${image_folder}${tankName}_head.png`);

    var tbody = new PIXI.Sprite(tankTexture);
    tbody.y = window.innerHeight / 2 - 150;

    var thead = new PIXI.Sprite(tankHeadTexture);
    thead.y = window.innerHeight / 2 - 150;

    var tank = new PIXI.Container();

    tank.addChild(tbody);
    tank.addChild(thead);

    var ratio = 0.2;
    tbody.scale.x = ratio;
    tbody.scale.y = ratio;
    thead.scale.x = ratio;
    thead.scale.y = ratio;
    
    return { 
        sprite: tank
    };
}
module.exports = Tank;
