var zoomX;
var leftX
var scrollStep;

function zoom_and_scroll_initVars() {
	zoomX = 1;
	leftX = 0;
	scrollStep = 100;
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