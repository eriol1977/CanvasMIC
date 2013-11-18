var zoomX;
var minZoomXValue;
var maxZoomXValue;
var zoomXStep;
var leftX
var scrollStep;
var zoomY;
var minZoomYValue;
var maxZoomYValue;
var zoomYStep;
var topY;
var verticalBorderAreaWidth;

function zoom_and_scroll_initVars() {
	zoomX = 1;
	minZoomXValue = 1;
	maxZoomXValue = 10;
	zoomXStep = .2;
	leftX = 0;
	scrollStep = 50;
	zoomY = 1;
	minZoomYValue = 1;
	maxZoomYValue = 10;
	zoomYStep = .2;
	topY = 0;
	verticalBorderAreaWidth = 50;
}

function updateHorizontalZoom(value) {
	var oldZoomX = zoomX;
	zoomX = value;
	// new leftX = (old leftX / old width with zoom) * new width with zoom
	leftX = (leftX/(mainScreenWidth*oldZoomX)) * (mainScreenWidth*zoomX);
	// sets limits to leftX
	if(leftX > 0) {
		leftX = 0;
	}else if(leftX < mainScreenWidth-(mainScreenWidth*zoomX)) {
		leftX = mainScreenWidth-(mainScreenWidth*zoomX);
	}
	drawScreen();
}

function updateVerticalZoom(value) {
	var oldZoomY = zoomY;
	zoomY = value;
	// new topY = (old topY / old height with zoom) * new height with zoom
	topY = (topY/(mainScreenHeight*oldZoomY)) * (mainScreenHeight*zoomY);
	// sets limits to topY
	if(topY > 0) {
		topY = 0;
	}else if(topY < mainScreenHeight-(mainScreenHeight*zoomY)) {
		topY = mainScreenHeight-(mainScreenHeight*zoomY);
	}
	drawScreen();
}

function scrollLeft() {
	if(leftX < 0) {
		leftX += scrollStep;
		drawScreen();
	}
}

function scrollRight() {
	if(leftX > mainScreenWidth-(mainScreenWidth*zoomX)) {
		leftX -= scrollStep;
		drawScreen();
	}
}

function scrollUp() {
	if(topY < 0) {
		topY += scrollStep;
		drawScreen();
	}
}

function scrollDown() {
	if(topY > mainScreenHeight-(mainScreenHeight*zoomY)) {
		topY -= scrollStep;
		drawScreen();
	}
}

function zoomInHorizontally() {
	var newZoomXValue = zoomX + zoomXStep;
	if(newZoomXValue > maxZoomXValue) {
		newZoomXValue = maxZoomXValue;
	}
	updateHorizontalZoom(newZoomXValue);
}

function zoomOutHorizontally() {
	var newZoomXValue = zoomX - zoomXStep;
	if(newZoomXValue < minZoomXValue) {
		newZoomXValue = minZoomXValue;
	}
	updateHorizontalZoom(newZoomXValue);
}

function zoomInVertically() {
	var newZoomYValue = zoomY + zoomYStep;
	if(newZoomYValue > maxZoomYValue) {
		newZoomYValue = maxZoomYValue;
	}
	updateVerticalZoom(newZoomYValue);
}

function zoomOutVertically() {
	var newZoomYValue = zoomY - zoomYStep;
	if(newZoomYValue < minZoomYValue) {
		newZoomYValue = minZoomYValue;
	}
	updateVerticalZoom(newZoomYValue);
}

function isMousePointerOnAVerticalBorder(x) {
	// returns true if the mouse pointer is positioned near one of the vertical borders of the canvas
	return (x > 0 && x < verticalBorderAreaWidth) || (x > mainScreenX + mainScreenWidth - verticalBorderAreaWidth && x < mainScreenX + mainScreenWidth);
}
