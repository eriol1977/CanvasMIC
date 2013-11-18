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
	
	// scrolling and zooming
	$('#canvasOne').on('mousewheel', function(event) {
		console.log(event.deltaX, event.deltaY, event.deltaFactor);
		if(event.altKey) {
			if(isMousePointerOnAVerticalBorder(getMousePos(theCanvas,event).x)) {
				if(event.deltaY>0) {
					zoomInVertically();
				}else{
					zoomOutVertically();
				}
			}else{
				if(event.deltaY>0) {
					zoomInHorizontally();
				}else{
					zoomOutHorizontally();
				}
			}
		}else{
			if(isMousePointerOnAVerticalBorder(getMousePos(theCanvas,event).x)) {
				if(event.deltaY>0) {
					scrollUp();
				}else{
					scrollDown();
				}
			}else{
				if(event.deltaY>0) {
					scrollRight();
				}else{
					scrollLeft();
				}
			}
		}
		event.preventDefault();
	});

	var isDown = false;     //flag we use to keep track
	var x1, y1, x2, y2;     //to store the coords
	
	// when mouse button is clicked and held    
	$('#canvasOne').on('mousedown', function(e){
		if (isDown === false) {
			isDown = true;
			var pos = getMousePos(theCanvas, e);
			x1 = pos.x;
			y1 = pos.y;
		}
	});

	// when mouse button is released (note: window, not canvas here)
	$(window).on('mouseup', function(e){
		if (isDown === true) {
			var pos = getMousePos(theCanvas, e);
			x2 = pos.x;
			y2 = pos.y;
			isDown = false;
		}
	});

	// get mouse pos relative to canvas
	function getMousePos(canvas, evt) {
		var rect = canvas.getBoundingClientRect();
		return {
			x: evt.clientX - rect.left,
			y: evt.clientY - rect.top
		};
	}
}

function drawScreen() {
	drawFrame();
	context.translate(leftX,topY);
	drawBackground();
}

function canvasSupport() {
	return Modernizr.canvas;
}