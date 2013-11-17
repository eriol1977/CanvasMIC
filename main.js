window.addEventListener("load", eventWindowLoaded, false);
			
var Debugger = function() {};
Debugger.log = function(message) {
	try {
		console.log(message);
	}catch(exception){
		return;
	}
}

var theCanvas;
var context;

function eventWindowLoaded() {
	canvasApp();
}

function canvasApp() {
	if(!canvasSupport) {
		return;
	}
	theCanvas = document.getElementById("canvasOne");
	if(!theCanvas) {
		return;
	}
	context = theCanvas.getContext("2d");
	
	init();
	
	drawScreen();
}

function init() {
	frame_initVars();
	zoom_and_scroll_initVars();
	background_initVars();
	
	// vertical zoom
	var zoomYElement = document.getElementById("zoomY");
	zoomYElement.addEventListener("change", function (e) {
			updateVerticalZoom(e.target.value);
		},false);
		
	// vertical scrolling
	var scrollUpButton = document.getElementById("scrollUp");
	scrollUpButton.addEventListener("click", scrollUp, false);
	var scrollDownButton = document.getElementById("scrollDown");
	scrollDownButton.addEventListener("click", scrollDown, false);
	
	// horizontal scrolling and zooming
	$('#canvasOne').on('mousewheel', function(event) {
		console.log(event.deltaX, event.deltaY, event.deltaFactor);
		if(event.altKey) {
			if(event.deltaY>0) {
				zoomInHorizontally();
			}else{
				zoomOutHorizontally();
			}
		}else{
			if(event.deltaY>0) {
				scrollRight();
			}else{
				scrollLeft();
			}
		}
		event.preventDefault();
	});
	
}

function drawScreen() {
	drawFrame();
	context.translate(leftX,topY);
	drawBackground();
}

function canvasSupport() {
	return Modernizr.canvas;
}