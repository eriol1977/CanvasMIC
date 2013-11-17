var maxHours = 30;
var maxMinutes = maxHours*60 - 1;

function convertMinutesToPixels(minutes, screenWidth) {
	return (screenWidth/maxMinutes) * minutes;
}