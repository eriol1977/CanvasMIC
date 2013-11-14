var maxHourLine;
var hourLabelY;
var hourLineY;
var hourLineHeight;
var maxStepBetweenHourLines;

function background_initVars() {
	maxHourLine = 29;
	hourLabelY = mainScreenY + 10;
	hourLineY = mainScreenY + 15;
	hourLineHeight = mainScreenHeight - 5;
	maxStepBetweenHourLines = 200;
}

function drawBackground() {
	var hourLineXs = calculateHourLineXs();
	for(var i=0; i<hourLineXs.length; i++) {
		if(i < maxHourLine) {
			drawHourLabel(hourLineXs[i],getHourLabel(i+1));
			drawHourLine(hourLineXs[i]);
		}
	}
}

function drawHourLine(x) {
	context.strokeStyle = "black";
	context.lineWidth = .5;
	context.setLineDash([10,3]);
	context.beginPath();
	context.moveTo(x, hourLineY);
	context.lineTo(x, hourLineHeight);
	context.stroke();
	context.closePath();
}

function drawHourLabel(x,hour) {
	context.font = "10px serif"
	context.fillStyle = "black";
	var metrics = context.measureText(hour);
	var textWidth = metrics.width;
	context.fillText (hour, x-textWidth/2, hourLabelY);
}

function calculateHourLineXs() {
	var hourLineXs = new Array();
	
	var i = 0;
	var tempX;
	var step = calculateHourLineStep(maxHourLine+1);
	for(var x=step; x<(mainScreenWidth*zoomX); x+=step) {
		tempX = Math.floor(x) + .5; //to avoid blurred lines
		hourLineXs[i] = tempX;
		i++;
	}
	
	return hourLineXs;
}

function calculateHourLineStep(numberOfSections) {
	var step = (mainScreenWidth*zoomX)/numberOfSections;
	return step;
}

function getHourLabel(hour) {
	var label = "";
	if(hour < 10) {
		label += "0";
	}
	label += hour;
	label += ":00";
	return label;
}