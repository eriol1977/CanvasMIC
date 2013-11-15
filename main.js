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
	
	// horizontal zoom
	var zoomXElement = document.getElementById("zoomX");
	zoomXElement.addEventListener("change", function (e) {
			updateHorizontalZoom(e.target.value);
		},false);
	
	// horizontal scrolling
	var scrollLeftButton = document.getElementById("scrollLeft");
	scrollLeftButton.addEventListener("click", scrollLeft, false);
	var scrollRightButton = document.getElementById("scrollRight");
	scrollRightButton.addEventListener("click", scrollRight, false);
	
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
}

function drawScreen() {
	drawFrame();
	context.translate(leftX,topY);
	drawBackground();
}

function canvasSupport() {
	return Modernizr.canvas;
}