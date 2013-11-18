var hourLabelYOffset; // vertical offset to draw the hour labels
var hourLineYOffset; // vertical offset to start drawing the hour lines
var zeroLineXOffset; // horizontal offset to draw the 00:00 line

function background_initVars() {
	hourLabelYOffset = 10;
	hourLineYOffset = 15;
	zeroLineXOffset = 20;
}

function drawBackground() {
	
	
	
	
	

	// draws the vertical lines
	var hourLineXs = calculateHourLineXs();
	for(var i=0; i<hourLineXs.length; i++) {
		drawHourLine(hourLineXs[i]);
	}

	// FIXME horizontal lines
	context.strokeStyle = "black";
	context.lineWidth = .5;
	context.setLineDash([10,3]);
	for(var y=60.5; y<=mainScreenY + (mainScreenHeight*zoomY); y+=20*zoomY) {
		context.beginPath();
		context.moveTo(20, y);
		context.lineTo(mainScreenWidth*zoomX, y);
		context.stroke();
		context.closePath();
	}
	
	// draws the background for the hour labels
	context.save();
	context.setTransform(1,0,0,1,0,0);
	context.fillStyle = "rgb(200,200,200)";
	context.fillRect(mainScreenX,mainScreenY,mainScreenWidth*zoomX,hourLineYOffset);
	context.fillRect(mainScreenX,mainScreenY,17,mainScreenHeight*zoomY);
	context.restore();
	
	// draws the hour labels
	for(var i=0; i<hourLineXs.length; i++) {
		drawHourLabel(hourLineXs[i],getHourLabel(i));
	}
	
	// FIXME number labels
	var i = 1;
	context.font = "10px serif"
	context.fillStyle = "black";
	for(var y=60.5; y<=mainScreenY + (mainScreenHeight*zoomY); y+=20*zoomY) {
		context.fillText (i, 5-leftX, y+3);
		i++;
	}
}

function drawHourLine(x) {
	context.strokeStyle = "black";
	context.lineWidth = .5;
	context.setLineDash([10,3]);
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
	var tempX;
	for(var hour=0; hour<maxHours; hour++) {
		tempX = convertMinutesToPixels(hour*60,(mainScreenWidth*zoomX)-zeroLineXOffset);
		hourLineXs[hour] = zeroLineXOffset + Math.floor(tempX) + .5; //to avoid blurred lines
	}
	return hourLineXs;
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