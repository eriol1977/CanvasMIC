var maxHours = 30;
var maxMinutes = maxHours*60 - 1;

function convertMinutesToPixels(minutes) {
	return ((getScreenWidth()/maxMinutes) * minutes) + zeroLineXOffset;
}

function convertPixelsToMinutes(pixels) {
	return Math.round((pixels - zeroLineXOffset - leftX) * (maxMinutes/getScreenWidth()));
}

function getMinutes(hourString) {
	var hourAndMinutes = hourString.split(':');
	return parseInt(hourAndMinutes[0])*60 + parseInt(hourAndMinutes[1]);
}

function getHourString(minutes) {
	var hours = Math.floor(minutes / 60);
	var minutes = minutes % 60;
	var hourString = "";
	if(hours < 10) {
		hourString += "0";
	}
	hourString = hourString + hours + ":";
	if(minutes < 10) {
		hourString += "0";
	}
	hourString += minutes;
	return hourString;	
}

function getScreenWidth() {
	return (mainScreenWidth*zoomX)-zeroLineXOffset;
}