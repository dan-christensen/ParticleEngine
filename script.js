var ctx = document.getElementById('myCanvas').getContext('2d');
var SCREEN_SIZE = 500;
var UPDATE_SPEED = 50;
var PI = 3.14159;
var NUM_PARTICALS = 1000;
var NUM_EXPLOSIONS = 1000;
var COLORS = ['RED', 'GREEN', 'BLUE', 'BLUE_PURPLE', 'RED_YELLOW', 'RED_ORANGE', 'YELLOW_GREEN', 'YELLOW_ORANGE', 'RED_PURPLE', 'RED_BLUE', 'RED_YELLOW_ORANGE'];
var VARIATIONS = ['EXPLOSION', 'CONE', 'WARP','STAR'];
// var VARIATIONS = ['WARP'];

var time = 0;
var timeProgress = .05;

var speedSlider = document.getElementById('speedSlider');
var speedOutput = document.getElementById('speedValue');
speedSlider.value = timeProgress;
speedOutput.innerHTML = speedSlider.value;
speedSlider.oninput = function () {
    speedOutput.innerHTML = this.value;
    timeProgress = parseFloat(this.value, 10);
}


function drawRect(x, y, size, r, g, b) {
    ctx.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
    ctx.fillRect(x - size / 2, y - size / 2, size, size);
}

function Partical(x, y, size, r, g, b, velocity, degree, lifespan) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.r = r;
    this.g = g;
    this.b = b;
    this.velocity = velocity;
    this.degree = degree;
    this.lifespan = lifespan;
    this.radians = this.degree * PI/180;
    this.updateX = Math.cos(this.radians) * this.velocity;
    this.updateY = Math.sin(this.radians) * this.velocity;
}

function Explosion() {
    this.particals = null;
    this.startTime = getRandomNum(0, NUM_EXPLOSIONS, false);
    this.scale = Math.random();
    if (this.particals != null) {
        for (var i = 0; i < this.particals.length; i++) {
            var partical = this.particals[i];
            partical.velocity *= this.scale * 2;
        }
    }
    this.color = COLORS[getRandomNum(0, COLORS.length - 1, true)];
    this.variation = VARIATIONS[getRandomNum(0, VARIATIONS.length - 1, true)];
    this.avgX = null;
    this.avgY = null;
}

function Color(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
}

var particals = [];
var explosions = [];

function genParticals() {
    var explosion = new Explosion();
    var tempParticals = [];
    var startPosX = getRandomNum(20, SCREEN_SIZE - 20, true);
    var startPosY = getRandomNum(20, SCREEN_SIZE - 20, true);
    var startAngle;
    if (explosion.variation == 'CONE') {
        startAngle = getRandomNum(0, 360, false);
    }
    else if (explosion.variation == 'WARP') {
        startAngle = [];
        for (var i = 0; i < 360; i++) {
            startPosX = SCREEN_SIZE / 2;
            startPosY = SCREEN_SIZE / 2;
            startAngle.push(i);
        }
    }
    else if (explosion.variation == 'STAR') {
        startAngle = [];
        for (var i = 0; i < 360; i += 45) {
            startAngle.push(i);
        }
    }
    for (var i = 0, len = NUM_PARTICALS; i < len; i++) {
        var color = getColor(explosion.color);
        var x;
        var y;
        if (explosion.variation == 'WARP') {
            x = startPosX;
            y = startPosY;
            color.r = 255;
            color.g = 255;
            color.b = 255;
        }
        else if (explosion.variation == 'STAR') {
            x = startPosX;
            y = startPosY;
            var scale = explosion.scale * 25;
            var point1X = 6;
            var point1Y = -2;
            var point2X = 2;
            var point2Y = -4;
            var point3X = 0;
            var point3Y = -8;
            var point4X = -2;
            var point4Y = -4;
            var point5X = -6;
            var point5Y = -2;
            var point6X = -2;
            var point6Y = -0;
            var point7X = 0;
            var point7Y = 4;
            var point8X = 2;
            var point8Y = 0;
            switch (direction) {
                case 0:
                    var x1 = point1X * scale;
                    var y1 = point1Y * scale;
                    var x2 = point2X * scale;
                    var y2 = point2Y * scale;
                    var u = Math.random();
                    x += (1 - u) * x1 + u * x2;
                    y += (1 - u) * y1 + u * y2;
                    break;
                case 45:
                    var x1 = point2X * scale;
                    var y1 = point2Y * scale;
                    var x2 = point3X * scale;
                    var y2 = point3Y * scale;
                    var u = Math.random();
                    x += (1 - u) * x1 + u * x2;
                    y += (1 - u) * y1 + u * y2;
                    break;
                case 90:
                    var x1 = point3X * scale;
                    var y1 = point3Y * scale;
                    var x2 = point4X * scale;
                    var y2 = point4Y * scale;
                    var u = Math.random();
                    x += (1 - u) * x1 + u * x2;
                    y += (1 - u) * y1 + u * y2;
                    break;
                case 135:
                    var x1 = point4X * scale;
                    var y1 = point4Y * scale;
                    var x2 = point5X * scale;
                    var y2 = point5Y * scale;
                    var u = Math.random();
                    x += (1 - u) * x1 + u * x2;
                    y += (1 - u) * y1 + u * y2;
                    break;
                case 180:
                    var x1 = point5X * scale;
                    var y1 = point5Y * scale;
                    var x2 = point6X * scale;
                    var y2 = point6Y * scale;
                    var u = Math.random();
                    x += (1 - u) * x1 + u * x2;
                    y += (1 - u) * y1 + u * y2;
                    break;
                case 225:
                    var x1 = point6X * scale;
                    var y1 = point6Y * scale;
                    var x2 = point7X * scale;
                    var y2 = point7Y * scale;
                    var u = Math.random();
                    x += (1 - u) * x1 + u * x2;
                    y += (1 - u) * y1 + u * y2;
                    break;
                case 270:
                    var x1 = point7X * scale;
                    var y1 = point7Y * scale;
                    var x2 = point8X * scale;
                    var y2 = point8Y * scale;
                    var u = Math.random();
                    x += (1 - u) * x1 + u * x2;
                    y += (1 - u) * y1 + u * y2;
                    break;
                case 315:
                    var x1 = point8X * scale;
                    var y1 = point8Y * scale;
                    var x2 = point1X * scale;
                    var y2 = point1Y * scale;
                    var u = Math.random();
                    x += (1 - u) * x1 + u * x2;
                    y += (1 - u) * y1 + u * y2;
                    break;
                default:
                    var x1 = point8X * scale;
                    var y1 = point8Y * scale;
                    var x2 = point1X * scale;
                    var y2 = point1Y * scale;
                    var u = Math.random();
                    x += (1 - u) * x1 + u * x2;
                    y += (1 - u) * y1 + u * y2;
                    break;
            }
        }
        else {
            x = getRandomNum(startPosX + getRandomNum(-10, 10), startPosX + getRandomNum(-10, 10), true);
            y = getRandomNum(startPosY + getRandomNum(-10, 10), startPosY + getRandomNum(-10, 10), true);
        }
        var r = color.r;
        var g = color.g;
        var b = color.b;
        // var size = getRandomNum(.1, .5, false);
        var size = getRandomNum(1, 2, false);
        var velocity;
        if (explosion.variation == 'WARP') {
            velocity = getRandomNum(1, 10, false);
        }
        else {
            velocity = getRandomNum(1, 3, false);
        }
        if (explosion.variation == 'EXPLOSION') {
            var direction = getRandomNum(0, 360, false);
        }
        else if(explosion.variation == 'CONE') {
            var direction = getRandomNum(startAngle, startAngle + getRandomNum(40, 85, false), false);
        }
        else if(explosion.variation == 'WARP') {
            var direction = startAngle[getRandomNum(0, startAngle.length - 1, true)];
        }
        else if(explosion.variation == 'STAR') {
            var direction = startAngle[getRandomNum(0, startAngle.length - 1, true)];
        }
        var lifespan = getRandomNum(1, 5, false);
        tempParticals.push(new Partical(x, y, size, r, g, b, velocity, direction, lifespan));
    }
    explosion.particals = tempParticals;
    var tempX = 0;
    var tempY = 0;
    for (var i = 0; i < explosion.particals.length; i++) {
        var partical = explosion.particals[i];
        tempX += partical.x;
        tempY += partical.y;
    }
    explosion.avgX = tempX / explosion.particals.length;
    explosion.avgY = tempY / explosion.particals.length;
    explosions.push(explosion);
}

for (var i = 0; i < NUM_EXPLOSIONS; i++) {
    genParticals();
}

function loop() {
    time += timeProgress;
    ctx.clearRect(0, 0, SCREEN_SIZE, SCREEN_SIZE);
    for (var j = 0; j < explosions.length; j++) {
        for (var i = 0; i < explosions[j].particals.length; i++) {
            var explosion = explosions[j];
            var partical = explosion.particals[i];
            if (explosion.startTime <= time) {
                if (partical != undefined) {
                    if (explosion.variation == 'WARP') {
                        partical.x += partical.updateX * (partical.velocity + Math.pow(time - explosion.startTime, 4));
                        partical.y += partical.updateY * (partical.velocity + Math.pow(time - explosion.startTime, 4));
                    }
                    else if (explosion.variation == 'STAR') {
                        if (partical.lifespan / 2 < time - explosion.startTime) {
                            explosion.particals[i] = undefined;
                            partical.x += partical.updateX * (partical.velocity);
                            partical.y += partical.updateY * (partical.velocity);
                        }
                    }
                    else {
                        partical.x += partical.updateX * partical.velocity;
                        partical.y += (partical.updateY + (time - explosion.startTime)) * partical.velocity;
                    }
                    drawRect(partical.x, partical.y, partical.size, partical.r, partical.g, partical.b);
                    if (partical.x < 0) {
                        explosion.particals[i] = undefined;
                    }
                    if (partical.lifespan < time - explosion.startTime) {
                        explosion.particals[i] = undefined;
                    }
                }
            }
        }
    }
}

function getRandomNum(min, max, shouldFloor) {
    min = Math.ceil(min);
    max = Math.floor(max);
    if (shouldFloor) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    else {
        return Math.random() * (max - min + 1) + min;
    }
}

function getColor(color) {
    var r = 0;
    var g = 0;
    var b = 0;
    switch (color) {
        case 'RED':
            r = getRandomNum(170, 255, true);
            g = getRandomNum(0, 25, true);
            b = getRandomNum(0, 25, true);
            break;
        case 'GREEN':
            r = getRandomNum(0, 25, true);
            g = getRandomNum(170, 255, true);
            b = getRandomNum(0, 25, true);
            break;
        case 'BLUE':
            r = getRandomNum(0, 25, true);
            g = getRandomNum(0, 255, true);
            b = getRandomNum(255, 255, true);
            break;
        case 'BLUE_PURPLE':
            var bluePurp = Math.round(Math.random());
            if (bluePurp == 0) {
                r = getRandomNum(0, 25, true);
                g = getRandomNum(0, 255, true);
                b = getRandomNum(255, 255, true);
            }
            else {
                r = getRandomNum(125, 255, true);
                g = getRandomNum(0, 0, true);
                b = getRandomNum(255, 255, true);
            }
            break;
        case 'RED_YELLOW':
            var redYellow = Math.round(Math.random());
            if (redYellow == 0) {
                r = getRandomNum(170, 255, true);
                g = getRandomNum(0, 25, true);
                b = getRandomNum(0, 25, true);
            }
            else {
                r = getRandomNum(125, 255, true);
                g = getRandomNum(185, 255, true);
                b = getRandomNum(0, 0, true);
            }
            break;
        case 'RED_ORANGE':
            var redOrange = Math.round(Math.random());
            if (redOrange == 0) {
                r = getRandomNum(170, 255, true);
                g = getRandomNum(0, 25, true);
                b = getRandomNum(0, 25, true);
            }
            else {
                r = getRandomNum(125, 255, true);
                g = getRandomNum(55, 150, true);
                b = getRandomNum(0, 0, true);
            }
            break;
        case 'YELLOW_GREEN':
            var yellowGreen = Math.round(Math.random());
            if (yellowGreen == 0) {
                r = getRandomNum(125, 255, true);
                g = getRandomNum(185, 255, true);
                b = getRandomNum(0, 0, true);
            }
            else {
                r = getRandomNum(0, 25, true);
                g = getRandomNum(170, 255, true);
                b = getRandomNum(0, 25, true);
            }
            break;
        case 'YELLOW_ORANGE':
            var yellowOrange = Math.round(Math.random());
            if (yellowOrange == 0) {
                r = getRandomNum(125, 255, true);
                g = getRandomNum(185, 255, true);
                b = getRandomNum(0, 0, true);
            }
            else {
                r = getRandomNum(125, 255, true);
                g = getRandomNum(55, 150, true);
                b = getRandomNum(0, 0, true);
            }
            break;
        case 'RED_PURPLE':
            var redPurple = Math.round(Math.random());
            if (redPurple == 0) {
                r = getRandomNum(170, 255, true);
                g = getRandomNum(0, 25, true);
                b = getRandomNum(0, 25, true);
            }
            else {
                r = getRandomNum(125, 255, true);
                g = getRandomNum(0, 0, true);
                b = getRandomNum(255, 255, true);
            }
            break;
        case 'RED_BLUE':
            var redBlue = Math.round(Math.random());
            if (redBlue == 0) {
                r = getRandomNum(170, 255, true);
                g = getRandomNum(0, 25, true);
                b = getRandomNum(0, 25, true);
            }
            else {
                r = getRandomNum(0, 25, true);
                g = getRandomNum(0, 255, true);
                b = getRandomNum(255, 255, true);
            }
            break;
        case 'RED_YELLOW_ORANGE':
            r = getRandomNum(255, 255, true);
            g = getRandomNum(0, 255, true);
            b = getRandomNum(0, 0, true);
            break;

        default:
            r = 255;
            g = 255;
            b = 255;
            break;
    } 
    return new Color(r, g, b);
}

setInterval(loop, UPDATE_SPEED);
