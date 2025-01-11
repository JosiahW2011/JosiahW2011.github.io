// Main Settings
let COLOR_BG = "#000000";
let COLOR_CUBE = "#FFFFFF";
let SPEED_X = 0.05;
let SPEED_Y = 0.05;
let SPEED_Z = 0.05;
var speedx = document.getElementById('speedx');
speedx.disabled = false;
var speedy = document.getElementById('speedy');
speedy.disabled = false;
var speedz = document.getElementById('speedz');
speedz.disabled = false;
var reset_speed = document.getElementById('reset_speed');
var freezeStart = document.getElementById('freezeStart');
var clickCount = 0;

speedx.value = 0.05;
speedy.value = 0.15;
speedz.value = 0.10;

// Func: POINT3D
const POINT3D = function(x,y,z) {
    this.x = x;
    this.y = y;
    this.z = z;
};

// Canvas Setup
var canvas = document.createElement("canvas");
document.body.appendChild(canvas);
var ctx = canvas.getContext("2d");


// Canvas Dimensions
var h = document.documentElement.clientHeight;
var w = document.documentElement.clientWidth;
canvas.height = h;
canvas.width = w;

// Colors + Lines
ctx.fillStyle = COLOR_BG;
ctx.strokeStyle = COLOR_CUBE;
ctx.lineWidth = w / 100;
ctx.lineCap = "round";

// Cube Parameters
var cx = w / 2;
var cy = h / 2;
var cz = 0;
var size = h / 4;
var vertices = [
    new POINT3D(cx - size, cy - size, cz - size),
    new POINT3D(cx + size, cy - size, cz - size),
    new POINT3D(cx + size, cy + size, cz - size),
    new POINT3D(cx - size, cy + size, cz - size),
    new POINT3D(cx - size, cy - size, cz + size),
    new POINT3D(cx + size, cy - size, cz + size),
    new POINT3D(cx + size, cy + size, cz + size),
    new POINT3D(cx - size, cy + size, cz + size)
];
var edges = [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0 ,4], [1 ,5], [2, 6], [3, 7]
];

speedx.addEventListener('change', (event) => {
    SPEED_X = event.target.value;
});

speedy.addEventListener('change', (event) => {
    SPEED_Y = event.target.value;
});

speedz.addEventListener('change', (event) => {
    SPEED_Z = event.target.value;
});

freezeStart.addEventListener('click', (event) => {
    if (clickAmount < 1) {
        clickAmount = clickAmount + 1;
        do {
            speedx.disabled = true;
            speedy.disabled = true;
            speedz.disabled = true;
        } while (!clickAmount = 1)
    } else if (clickAmount = 1) {
        clickAmount = 0;
        speedx.disabled = false;
        speedy.disabled = false;
        speedz.disabled = false;
    }
});

reset_speed.addEventListener('click', (event) => {
    speedx.value = 0.05;
    speedy.value = 0.15;
    speedz.value = 0.10;
    SPEED_X = 0.05;
    SPEED_Y = 0.15;
    SPEED_Z = 0.10;
});

// Animation Time + Framing
var timeDelta, timeLast = 0;
requestAnimationFrame(loop);
function loop(timeNow) {
    timeDelta = timeNow - timeLast;
    timeLast = timeNow;

    // BG fill
    ctx.fillRect(0, 0, w, h);

    let angle = timeDelta * 0.001 * SPEED_Z * Math.PI * 2;
    for (let v of vertices) {
        let dx = v.x - cx;
        let dy = v.y - cy;
        let x = dx * Math.cos(angle) - dy * Math.sin(angle);
        let y = dx * Math.sin(angle) + dy * Math.cos(angle);
        v.x = x + cx;
        v.y = y + cy;
    }

    angle = timeDelta * 0.001 * SPEED_X * Math.PI * 2;
    for (let v of vertices) {
        let dy = v.y - cy;
        let dz = v.z - cz;
        let y = dy * Math.cos(angle) - dz * Math.sin(angle);
        let z = dy * Math.sin(angle) + dz * Math.cos(angle);
        v.y = y + cy;
        v.z = z + cz;
    }

    angle = timeDelta * 0.001 * SPEED_Y * Math.PI * 2;
    for (let v of vertices) {
        let dx = v.x - cx;
        let dz = v.z - cz;
        let x = dz * Math.sin(angle) + dx * Math.cos(angle);
        let z = dz * Math.cos(angle) - dx * Math.sin(angle);
        v.x = x + cx;
        v.z = z + cz;
    }
    
    for (let edge of edges) {
        ctx.beginPath();
        ctx.moveTo(vertices[edge[0]].x, vertices[edge[0]].y);
        ctx.lineTo(vertices[edge[1]].x, vertices[edge[1]].y);
        ctx.stroke();
    }

    // Call frame
    requestAnimationFrame(loop);
};
