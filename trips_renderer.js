function drawTrips(tripsModel) {
	var trip;
	var trips = tripsModel.getTrips();
	for(var i=0; i<trips.length; i++) {
		trip = trips[i];
		drawTripByMinutes(trip.getStartTime(), trip.getTime(), trip.getLevel(), trip.getColor());
	}
}

function drawTripByMinutes(startTime, time, level, color) {
	var startX = convertMinutesToPixels(startTime);
	var endX = convertMinutesToPixels(startTime+time);
	drawTrip(startX, endX, level, color);
}

function drawTrip(startX, endX, level, color) {
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
}