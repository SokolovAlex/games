var Tank = (tankName) => {
    const image_folder = '/Areas/PixiGames/Images/';
    
    var tankTexture = PIXI.Texture.fromImage(`${image_folder}${tankName}_body.png`);
    var tankHeadTexture = PIXI.Texture.fromImage(`${image_folder}${tankName}_head.png`);

    var tbody = new PIXI.Sprite(tankTexture);
    tbody.y = window.innerHeight / 2 - 150
    tbody.x = 100;

    var thead = new PIXI.Sprite(tankHeadTexture);
    thead.y = window.innerHeight / 2 - 150;
    thead.x = 100;

    var sprite = new PIXI.Container();

    sprite.addChild(tbody);
    sprite.addChild(thead);

    tbody.anchor.x = 0.5;
    tbody.anchor.y = 0.5;

    thead.anchor.x = 0.5;
    thead.anchor.y = 0.5;
    thead.pivot.set(-50, 0);

    var ratio = 0.2;
    tbody.scale.x = ratio;
    tbody.scale.y = ratio;
    thead.scale.x = ratio;
    thead.scale.y = ratio;

    var rotate_speed = 0.02;
    var hrorate_speed = 0.03;
    var max_speed_forward = 2;
    var max_speed_back = 1;
    var forward_accelerate = 0.03;
    var back_accelerate = 0.02;
    var resistance = 0.01;

    var tank = {
        sprite: sprite,
        speed: 0,

        move: function () {
            if (tank.leftRotate) {
                tbody.rotation -= rotate_speed;
                thead.rotation -= rotate_speed;
            }
            if (tank.rightRotate) {
                tbody.rotation += rotate_speed;
                thead.rotation += rotate_speed;
            }

            if (tank.moveForward) {
                tank.speed += forward_accelerate;
            }

            if (tank.speed > 0) {
                tank.speed -= resistance;
            } else if (tank.speed < 0) {
                tank.speed += resistance;
            }

            if (tank.speed > max_speed_forward) {
                tank.speed = max_speed_forward;
            }

            sprite.x += tank.speed * Math.cos(tbody.rotation);
            sprite.y += tank.speed * Math.sin(tbody.rotation);

            if (tank.hrotate) {

                thead.rotation += tank.hrotate * hrorate_speed;
            }
        }
    };
    return tank;
}
module.exports = Tank;
