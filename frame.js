var frameX;
var frameY;
var frameWidth;
var frameHeight;
var mainScreenX;
var mainScreenY;
var mainScreenWidth;
var mainScreenHeight;

function frame_initVars() {
	frameWidth = theCanvas.width-2;
	frameHeight = theCanvas.height-2;
	mainScreenX = 1;
	mainScreenY = 40;
	mainScreenWidth = frameWidth;
	mainScreenHeight = 500; // TODO define sizes proportionally (%) to canvas size
}

function drawFrame() {
	cleanFrame();
	drawHeader();
	drawFooter();
	context.beginPath();
	context.rect(mainScreenX,mainScreenY,mainScreenWidth,mainScreenHeight);
	context.stroke();
	context.clip();
}

function drawHeader() {
	context.strokeRect(1,1,frameWidth,30);
}

function drawFooter() {
	context.strokeRect(1,mainScreenY + mainScreenHeight+10,frameWidth,30);
}

function cleanFrame() {
	context.setTransform(1,0,0,1,0,0);
	context.clearRect(1,1,frameWidth,frameHeight);
	context.strokeStyle = "black";
	context.lineWidth = 1;
	context.setLineDash([0]);
}