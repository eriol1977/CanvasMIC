function drawTrips(tripsModel) {
	var trip;
	var trips = tripsModel.getTrips();
	for(var i=0; i<trips.length; i++) {
		trip = trips[i];
		drawTripByMinutes(trip.getStartTime(), trip.getTime(), trip.getLevel(), trip.getColor(), trip.isSelected());
	}
}

function drawTripByMinutes(startTime, time, level, color, selected) {
	var startX = convertMinutesToPixels(startTime);
	var endX = convertMinutesToPixels(startTime+time);
	var y = getElementY(level);
	
	if(endX < (zeroLineXOffset-leftX) || y < (startY-topY)) { // the trip is outside the main screen
		return;
	}
	
	var drawLeftLabel = true;
	if(startX < zeroLineXOffset-leftX) {
		startX = zeroLineXOffset-leftX; // avoids painting trips above the left labels
		drawLeftLabel = false; // the left label (startTime) is outside the main screen
	}
	
	drawTrip(startX, endX, level, color, selected);
	if(drawLeftLabel) {
		drawMinutesLabel(startTime, startX, level, true);
	}
	drawMinutesLabel(startTime+time, endX, level, false);
}

function drawTrip(startX, endX, level, color, selected) {
	var lineWidth = getVerticalSectionHeight()/5;
	if(lineWidth > 4) {
		lineWidth = 4;
	}
	context.strokeStyle = color;
	context.lineWidth = lineWidth;
	context.setLineDash([0]);
	context.lineCap = "round";
	context.beginPath();
	context.moveTo(startX+lineWidth/2,getElementY(level)); // lineWidth/2 is used to compensate the line cap width
	context.lineTo(endX-lineWidth/2,getElementY(level));
	context.stroke();
	context.closePath();
	if(selected) {
		context.strokeStyle = "orange";
		context.lineWidth = 2;
		var outlineDelta = 4;
		var x1 = startX+lineWidth/2 - outlineDelta;
		var y1 = getElementY(level) - outlineDelta;
		var w = endX-lineWidth/2 + outlineDelta - x1;
		var h = getElementY(level) + outlineDelta - y1;
		context.strokeRect(x1, y1, w, h);
	}
}

function drawMinutesLabel(time, x, level, start) {
	context.font = "9px serif"
	context.fillStyle = "black";
	var minutesString = getHourString(time).split(':')[1];
	var labelX = x;
	if(!start) {
		var metrics = context.measureText(minutesString);
		var textWidth = metrics.width;
		labelX -= textWidth;
	}
	context.fillText (minutesString, labelX, getElementY(level)-3);
}