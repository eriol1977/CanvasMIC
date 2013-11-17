var zoomX;
var leftX
var scrollStep;
var zoomY;
var topY;

function zoom_and_scroll_initVars() {
	zoomX = 1;
	leftX = 0;
	scrollStep = 100;
	zoomY = 1;
	topY = 0;
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
