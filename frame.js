var frameX;
var frameY;
var frameWidth;
var frameHeight;
var mainScreenX;
var mainScreenY;
var mainScreenWidth;
var mainScreenHeight;
var headerHeight;
var footerHeight;

function frame_initVars() {
	frameWidth = theCanvas.width-2;
	frameHeight = theCanvas.height-2;
	//headerHeight = frameHeight * .03;
	headerHeight = 0;
	//footerHeight = frameHeight * .03;
	footerHeight = 0;
	mainScreenX = 1;
	mainScreenY = headerHeight+10;
	mainScreenWidth = frameWidth;
	mainScreenHeight = frameHeight * .93
}

function drawFrame() {
	cleanFrame();
	//drawHeader();
	//drawFooter();
	context.beginPath();
	context.rect(mainScreenX,mainScreenY,mainScreenWidth,mainScreenHeight);
	context.stroke();
	context.clip();
}

function drawHeader() {
	context.strokeRect(1,1,frameWidth,headerHeight);
}

function drawFooter() {
	context.strokeRect(1,mainScreenY + mainScreenHeight+10,frameWidth,footerHeight);
}

function cleanFrame() {
	context.setTransform(1,0,0,1,0,0);
	context.clearRect(1,1,frameWidth,frameHeight);
	context.strokeStyle = "black";
	context.lineWidth = 1;
	context.setLineDash([0]);
}