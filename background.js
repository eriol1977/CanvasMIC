var hourLabelYOffset; // vertical offset to draw the hour labels
var hourLineYOffset; // vertical offset to start drawing the hour lines
var zeroLineXOffset; // horizontal offset to draw the 00:00 line

function background_initVars() {
	hourLabelYOffset = 10;
	hourLineYOffset = 15;
	zeroLineXOffset = 20;
}

function drawBackground() {

	// horizontal lines
	var i = 0;
	var color;
	for(var y=40.5; y<=mainScreenY + (mainScreenHeight*zoomY); y+=20*zoomY) {
		if(i % 2 == 1) {
			color = "rgb(235,235,255)";
		}else{
			color = "white";
		}
		context.fillStyle = color;
		context.fillRect(zeroLineXOffset,y,mainScreenWidth*zoomX,y+20*zoomY);
		i++;
	}

	// draws the vertical lines
	var hourLineXs = calculateHourLineXs();
	for(var i=0; i<hourLineXs.length; i++) {
		drawHourLine(hourLineXs[i].x,hourLineXs[i].fullHour);
	}
	
	// draws the background for the hour labels
	context.save();
	context.setTransform(1,0,0,1,0,0);
	context.fillStyle = "white";
	context.fillRect(mainScreenX,mainScreenY,mainScreenWidth*zoomX,hourLineYOffset);
	context.fillRect(mainScreenX,mainScreenY,17,mainScreenHeight*zoomY);
	context.restore();
	
	// draws the hour labels
	var hour;
	for(var i=0; i<hourLineXs.length; i++) {
		if(hourLineXs[i].fullHour) {
			hour = i;
		}
		drawHourLabel(hourLineXs[i].x, hourLineXs[i].hourLabel);
	}
	
	// FIXME number labels
	var i = 1;
	context.font = "10px serif"
	context.fillStyle = "black";
	for(var y=40.5; y<=mainScreenY + (mainScreenHeight*zoomY); y+=20*zoomY) {
		context.fillText (i, 5-leftX, y + 10*zoomY + 3);
		i++;
	}
}

function drawHourLine(x,fullHour) {
	context.strokeStyle = "black";
	context.lineWidth = .5;
	if(fullHour) {
		context.setLineDash([10,3]);
	}else{
		context.setLineDash([3,5]);
	}
	context.beginPath();
	context.moveTo(x, mainScreenY + hourLineYOffset);
	context.lineTo(x, mainScreenY + (mainScreenHeight*zoomY));
	context.stroke();
	context.closePath();
}

function drawHourLabel(x,hour) {
	context.font = "10px serif"
	context.fillStyle = "black";
	var metrics = context.measureText(hour);
	var textWidth = metrics.width;
	context.fillText (hour, x-textWidth/2, mainScreenY + hourLabelYOffset - topY);
}

function calculateHourLineXs() {
	var hourLineXs = new Array();
	var i = 0;
	for(var hour=0; hour<=maxHours; hour++) {
		if(zoomX > maxZoomXValue/2) {
			hourLineXs[i++] = calculateHourLineX(hour-.75);
			hourLineXs[i++] = calculateHourLineX(hour-.25);
		}
		if(zoomX > maxZoomXValue/3) {
			hourLineXs[i++] = calculateHourLineX(hour-.5);
		}
		hourLineXs[i++] = calculateHourLineX(hour);
	}
	return hourLineXs;
}

function calculateHourLineX(hour) {
	var tempX = convertMinutesToPixels(hour*60,(mainScreenWidth*zoomX)-zeroLineXOffset);
	return { x: zeroLineXOffset + Math.floor(tempX) + .5, //to avoid blurred lines
			 hourLabel: getHourLabel(hour),
			 fullHour: (hour % 1) == 0
			};
}

function getHourLabel(hour) {
	var label = "";
	if(hour < 10) {
		label += "0";
	}
	label += Math.floor(hour);
	var decimalPart = hour % 1;
	if(decimalPart == 0) {
		label += ":00";
	}else if(decimalPart == .5){
		label += ":30";
	}else if(decimalPart == .25){
		label += ":15";
	}else if(decimalPart == .75){
		label += ":45";
	}
	return label;
}