var maxHours = 30;
var maxMinutes = maxHours*60 - 1;

function convertMinutesToPixels(minutes) {
	var screenWidth = (mainScreenWidth*zoomX)-zeroLineXOffset;
	return ((screenWidth/maxMinutes) * minutes) + zeroLineXOffset;
}

function getMinutes(hourString) {
	var hourAndMinutes = hourString.split(':');
	return parseInt(hourAndMinutes[0])*60 + parseInt(hourAndMinutes[1]);
}