var maxHours = 30;
var maxMinutes = maxHours*60 - 1;

function convertMinutesToPixels(minutes) {
	return ((getScreenWidth()/maxMinutes) * minutes) + zeroLineXOffset;
}

function convertPixelsToMinutes(pixels) {
	return (pixels - zeroLineXOffset - leftX) * (maxMinutes/getScreenWidth());
}

function getMinutes(hourString) {
	var hourAndMinutes = hourString.split(':');
	return parseInt(hourAndMinutes[0])*60 + parseInt(hourAndMinutes[1]);
}

function getScreenWidth() {
	return (mainScreenWidth*zoomX)-zeroLineXOffset;
}