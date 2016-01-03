let getRandom = (min, max) => {
    return Math.random() * (max - min) + min;
};

export function getRandom(min, max){
    return getRandom(min, max);
};

export function depthCompare(a,b) {
    if (a.z < b.z)
        return -1;
    if (a.z > b.z)
        return 1;
    return 0;
};

export function randomPosition(width, height) {
    var pi = Math.PI;
    var r = Math.random();
    var x, y, dir;

    if (r > 0.75) {
        x = width + 10;
        y = Math.random() * height;
        dir = getRandom(pi / 2, pi * 3 / 2);
    } else if (r > 0.5) {
        x = -10;
        y = Math.random() * height;
        dir = getRandom(-pi / 2, pi / 2);
    } else if (r > 0.25) {
        y = -10;
        x = Math.random() * width;
        dir = getRandom(0, pi);
    } else {
        y = height + 10;
        x = Math.random() * width;
        dir = getRandom(pi, 2 * pi);
    }
    return { x: x, y: y, dir: dir };
};