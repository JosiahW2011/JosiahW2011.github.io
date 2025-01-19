// Main Setup
let BODY = document.getElementById("BODY");
BODY.style.margin = 0;
var canvas = document.createElement("canvas");
document.body.appendChild(canvas);
let ctx = canvas.getContext("2d");

// Detect Client Width + Height
var h = document.documentElement.clientHeight
let w = document.documentElement.clientWidth

// Set canvas size
canvas.width = w;
canvas.height = h;

// Generate BG
ctx.fillStyle = "#FFFFFF";
ctx.fillRect(0, 0, w, h);

// Generate Open Bible
var christImg = new Image();
christImg.src = "Cross.png";
christImg.onload = () => {
	ctx.drawImage(christImg, 0, 0, 302, canvas.height / 1.50);
};

// Produce Text
ctx.font = "bold 35px Times New Roman";
ctx.fillStyle = "#000000";
ctx.fillText('"All authority in heaven and on earth has been given', 300, 50);
ctx.fillText('to me. Therefore go and make disciples of all nations,', 312, 100);
ctx.fillText('baptizing them in the name of the Father and of the Son', 312, 150);
ctx.fillText('and of the Holy Spirit." Matthew 28:18-19', 312, 200);