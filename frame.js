var frameX;
var frameY;
var frameWidth;
var frameHeight;
var headerHeight;
var headerX;
var headerY;
var headerWidth;
var footerHeight;
var footerX;
var footerY;
var footerWidth;
var mainScreenX;
var mainScreenY;
var mainScreenWidth;
var mainScreenHeight;

function frame_initVars() {
	frameX = 1;
	frameY = 1;
	frameWidth = theCanvas.width-2;
	frameHeight = theCanvas.height-2;
	headerHeight = 30;
	headerX = frameX;
	headerY = frameY;
	headerWidth = frameWidth;
	footerHeight = 30;
	footerX = frameX;
	footerY = frameHeight-footerHeight;
	footerWidth = frameWidth;
	mainScreenX = frameX;
	mainScreenY = headerY + headerHeight;
	mainScreenWidth = frameWidth;
	mainScreenHeight = footerY;
}

function drawFrame() {
	cleanFrame();
	context.strokeRect(frameX,frameY,frameWidth,frameHeight);
	drawHeader();
	drawFooter();
}

function drawHeader() {
	context.strokeRect(headerX,headerY,headerWidth,headerHeight);
}

function drawFooter() {
	context.strokeRect(footerX,footerY,footerWidth,footerHeight+2); //+2 or the line seems blurred
}

function cleanFrame() {
	context.setTransform(1,0,0,1,0,0);
	context.clearRect(frameX,frameY,frameWidth,frameHeight);
	context.strokeStyle = "black";
	context.lineWidth = 1;
	context.setLineDash([0]);
}