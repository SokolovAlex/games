var Tank = (tankName, stage) => {
    var Whizzbang = require('./whizzbang'),
        Explosion = require('./explosion'),
        config = require('./settings');

    var tankTexture = PIXI.Texture.fromImage(`${config.image_folder}${tankName}_body.png`);
    var tankHeadTexture = PIXI.Texture.fromImage(`${config.image_folder}${tankName}_head.png`);

    var tbody = new PIXI.Sprite(tankTexture);
    var thead = new PIXI.Sprite(tankHeadTexture);
    var sprite = new PIXI.Container();

    sprite.y = 200;
    sprite.x = 200;
    sprite.z = 10;

    tbody.anchor.x = 0.5;
    tbody.anchor.y = 0.5;
    thead.anchor.x = 0.5;
    thead.anchor.y = 0.5;

    thead.pivot.set(-50, 0);

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
    var trunk_length = 50;
    var whizzbang_speed = 5,
        reloadTime = 1000;

    var width, height, gip, atan;
    var loaded = false;
    tbody.texture.baseTexture.on('loaded', () => {
        loaded = true;
        width = tbody.width * ratio;
        height = tbody.height * ratio;
        atan = Math.atan(height / width);
        gip = Math.sqrt(width * width / 4 + height * height / 4);
    });

    var cornerPoint1, cornerPoint2, cornerPoint3, cornerPoint4;

    var tank = {
        sprite: sprite,
        points: 0,
        speed: 0,
        reloading: false,
        shoot: () => {
            if (tank.reloading) {
                return;
            }
            var direction = sprite.rotation + thead.rotation;

            var x = sprite.x + Math.cos(direction) * trunk_length;
            var y = sprite.y + Math.sin(direction) * trunk_length;

            var exp = new Explosion({ x: x, y: y });

            stage.addChild(exp.movie);

            var whizzbang = new Whizzbang({
                x: x,
                y: y,
                direction: direction,
                speed: whizzbang_speed
            });

            tank.reloading = true;
            tank.shootTime = new Date();

            setTimeout(() => tank.reloading = false, reloadTime);

            return whizzbang;
        },
        move: () => {  
            var dx = 0, dy = 0, dr = 0;

            if (tank.hrotate) {
                thead.rotation += tank.hrotate * hrorate_speed;
            }

            if (tank.moveForward) {
                tank.speed += forward_accelerate;
            }

            if (tank.moveBack) {
                tank.speed -= back_accelerate;
            }

            var isForward = tank.speed > -resistance;
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
                dx = tank.speed * Math.cos(sprite.rotation);
                dy = tank.speed * Math.sin(sprite.rotation);
                sprite.x += dx;
                sprite.y += dy;
            }

            if (tank.brotate) {
                dr = res * tank.brotate * rotate_speed;
                sprite.rotation += dr;
            } 

            if (tank.collision()) {
                sprite.x -= dx;
                sprite.y -= dy;
                sprite.rotation -= dr;
                tank.speed = 0;
                return;
            }
        },
        collision: () => {
            if(!loaded) {
                return false;
            }

            var dir1 = sprite.rotation + atan;
            var dir2 = sprite.rotation - atan;

            cornerPoint1 = {
                x: sprite.x + gip * Math.cos(dir1),
                y: sprite.y + gip * Math.sin(dir1)
            };

            cornerPoint2 = {
                x: sprite.x + gip * Math.cos(dir2),
                y: sprite.y + gip * Math.sin(dir2)
            };
            
            cornerPoint3 = {
                x: sprite.x - gip * Math.cos(dir1),
                y: sprite.y - gip * Math.sin(dir1)
            };

            cornerPoint4 = {
                x: sprite.x - gip * Math.cos(dir2),
                y: sprite.y - gip * Math.sin(dir2)
            };

            tank.a1 = cornerPoint1.x === cornerPoint2.x ? false :
                (cornerPoint1.y - cornerPoint2.y) / (cornerPoint1.x - cornerPoint2.x);
            tank.a2 = cornerPoint1.x === cornerPoint4.x ? false :
                (cornerPoint1.y - cornerPoint4.y) / (cornerPoint1.x - cornerPoint4.x);

            if(tank.a1 !== false) {
                var b1 = - cornerPoint1.x * tank.a1 + cornerPoint1.y;
                var b2 = - cornerPoint3.x * tank.a1 + cornerPoint3.y;
                tank.maxb1 = Math.max(b1, b2);
                tank.minb1 = Math.min(b1, b2);
            }

            if (tank.a2 !== false) {
                var b3 = - cornerPoint1.x * tank.a2 + cornerPoint1.y;
                var b4 = - cornerPoint3.x * tank.a2 + cornerPoint3.y;
                tank.maxb2 = Math.max(b3, b4);
                tank.minb2 = Math.min(b3, b4);
            }

            if (cornerPoint1.x < 0
                || cornerPoint2.x < 0
                || cornerPoint1.y < 0
                || cornerPoint2.y < 0) {
                return true;
            }

            if (cornerPoint1.x > config.stage_size.width
                || cornerPoint2.x > config.stage_size.width
                || cornerPoint1.y > config.stage_size.height
                || cornerPoint2.y > config.stage_size.height) {
                return true;
            }

            if (cornerPoint3.x < 0
               || cornerPoint4.x < 0
               || cornerPoint3.y < 0
               || cornerPoint4.y < 0) {
                return true;
            }

            if (cornerPoint3.x > config.stage_size.width
                || cornerPoint4.x > config.stage_size.width
                || cornerPoint3.y > config.stage_size.height
                || cornerPoint4.y > config.stage_size.height) {
                return true;
            }

            return false;
        },
        checkKill: (enemies, shells) => {
            _.each(enemies, (enemy, i) => {
                var corners = enemy.getCorners();
                for (var key in corners) {
                    var corner = corners[key];
                    let b1 = -tank.a1 * corner.x + corner.y;
                    let b2 = -tank.a2 * corner.x + corner.y;
                    if (b1 < tank.maxb1 && b1 > tank.minb1
                        && b2 < tank.maxb2 && b2 > tank.minb2) {
                        enemy.dead();
                        tank.points = tank.points + 2;
                        return;
                    }
                }

                _.each(shells, (shell) => {
                    var x = shell.sprite.x;
                    var y = shell.sprite.y;
                    if (x > corners.nw.x && x < corners.ne.x
                        && y > corners.nw.y && y < corners.sw.y) {
                        enemy.dead();
                        shell.destruct();
                        tank.points = tank.points + 10;
                        return;
                    }
                });
            });
        }
    };

    tank.move();

    return tank;
}
module.exports = Tank;
