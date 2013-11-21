var trips = new Array();

function addTrip(x,y) {
	var startTime = convertPixelsToMinutes(x);
	var time = getMinutes("01:00");
	var level = getVerticalLevel(y);
	var color = "blue";
	addTripByMinutes(startTime, time, level, color);
}

function addTripByMinutes(startTime, time, level, color) {
	trips.push({ t1: startTime,
				 t2: time,
				 lvl: level,
				 col: color
				});
}