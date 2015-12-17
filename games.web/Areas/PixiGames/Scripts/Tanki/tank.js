var Tank = (tankName) => {
    const image_folder = '/Areas/PixiGames/Images/';
    
    var tankTexture = PIXI.Texture.fromImage(`${image_folder}${tankName}_body.png`);
    var tankHeadTexture = PIXI.Texture.fromImage(`${image_folder}${tankName}_head.png`);

    var tbody = new PIXI.Sprite(tankTexture);
    var thead = new PIXI.Sprite(tankHeadTexture);
    var sprite = new PIXI.Container();

    sprite.y = 200;
    sprite.x = 200;

    tbody.anchor.x = 0.5;
    tbody.anchor.y = 0.5;
    thead.anchor.x = 0.5;
    thead.anchor.y = 0.5;

    thead.pivot.set(-50, 0);
    thead.x = -40;

    sprite.addChild(tbody);
    sprite.addChild(thead);

    var ratio = 0.2;
    sprite.scale.x = ratio;
    sprite.scale.y = ratio;

    var rotate_speed = 0.015;
    var hrorate_speed = 0.02;
    var max_speed_forward = 2;
    var max_speed_back = -1;
    var forward_accelerate = 0.03;
    var back_accelerate = 0.02;
    var resistance = 0.01;

    var tank = {
        sprite: sprite,
        speed: 0,
        move: function () {
           

            if (tank.moveForward) {
                tank.speed += forward_accelerate;
            }

            if (tank.moveBack) {
                tank.speed -= back_accelerate;
            }

            var isForward = tank.speed > resistance;
            var res = isForward ? -1 : 1;

            if (Math.abs(tank.speed) < resistance) {
                tank.speed = 0;
            } else {
                tank.speed += res * resistance;

                if (tank.speed > max_speed_forward) {
                    tank.speed = max_speed_forward;
                }

                if (tank.speed < max_speed_back) {
                    tank.speed = max_speed_back;
                }

                sprite.x += tank.speed * Math.cos(sprite.rotation);
                sprite.y += tank.speed * Math.sin(sprite.rotation);
            }

            if (tank.leftRotate) {
                sprite.rotation += res * rotate_speed;
            } else if (tank.rightRotate) {
                sprite.rotation -= res * rotate_speed;
            }
            
            if (tank.hrotate) {
                thead.rotation += tank.hrotate * hrorate_speed;
            }
        }
    };
    return tank;
}
module.exports = Tank;
