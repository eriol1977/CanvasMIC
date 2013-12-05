window.addEventListener("load", eventWindowLoaded, false);

window.onerror = function (msg, url, line) {
   alert("Message : " + msg );
}
			
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
var idGenerator = new IdGenerator();
var tripsModel = new TripsModel(idGenerator);
var importer = new Importer(tripsModel);
var exporter = new Exporter(tripsModel);

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
	theCanvas.width = $(window).width() - 30;
	theCanvas.height = $(window).height() - 10;
	
	context = theCanvas.getContext("2d");
	
	init();
	
	drawScreen();
}

function init() {
	frame_initVars();
	zoom_and_scroll_initVars();
	background_initVars();
	
	// FIXME trip importation example
	// var trip1 = new Trip(idGenerator.getNextId(), getMinutes("00:00"),getMinutes("01:00"),1,"red");
	// var trip2 = new Trip(idGenerator.getNextId(), getMinutes("02:30"),getMinutes("01:12"),2,"blue");
	// var trip3 = new Trip(idGenerator.getNextId(), getMinutes("04:45"),getMinutes("00:37"),4,"green");
	// tripsModel.importTrip(trip1);
	// tripsModel.importTrip(trip2);
	// tripsModel.importTrip(trip3);
	
	// scrolling and zooming
	$('#canvasOne').on('mousewheel', function(event) {
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

	// drags trip when mouse button is clicked and held (without CTRL)
	var tripSelected;
	$('#canvasOne').on('mousedown', function(e){
	    e.preventDefault();
		if (e.ctrlKey) {
			return;
		}
		var pos = getMousePos(theCanvas, e);
		tripSelected = tripsModel.selectTrip(pos.x,pos.y);
	});

	// sets trip into place (with validation) when mouse button is released
	$('#canvasOne').on('mouseup', function(e){
		e.preventDefault();
		var pos = getMousePos(theCanvas, e);
		tripsModel.dragTrip(tripSelected,pos.x,pos.y,true);
		tripSelected = null;
		drawScreen();
	});

	// left click + CTRL adds a trip
	$('#canvasOne').click(function(e){
		if (e.ctrlKey) {
			try {
				var mousePos = getMousePos(theCanvas, e);
				if(isInsideMainScreen(mousePos.x, mousePos.y)) {
					tripsModel.addTrip(mousePos.x, mousePos.y);
					drawScreen();
				}
			}catch(e){
				if(e instanceof MICException) {
					alert(e);
				}
			}
		}
	});

	// right click removes a trip (while avoiding automatic context menu opening)
	$(this).bind("contextmenu", function(e) {
		var mousePos = getMousePos(theCanvas, e);
		if(isInsideMainScreen(mousePos.x, mousePos.y)) {
			tripsModel.removeTrip(mousePos.x, mousePos.y);
			drawScreen();
		}
		e.preventDefault();
	});
	
	// imports trip data
	$("#open_file").change(function(e){
		var files = e.target.files;
		if(files) {
			importer.importFile(files[0]);
		}
		$("#open_file").val(null); // without this, event "change" is captured only once
	});
	
	// shows hh:mm tooltip while moving the mouse with ctrl pressed
	// FIXME is there a better way? this redraws the canvas a lot!
	var showingTooltip = false;
	$('#canvasOne').on('mousemove', function(e){
		var pos = getMousePos(theCanvas, e);
		if(isInsideMainScreen(pos.x, pos.y)) {
			if(tripSelected) {
				tripsModel.dragTrip(tripSelected,pos.x,pos.y,false);
				drawScreen();
			}else{
				if (e.ctrlKey) {
					showingTooltip = true;
					
					var minutes = convertPixelsToMinutes(pos.x);
					var text = getHourString(minutes);
					
					context.font = "10px serif"
					context.fillStyle = "black";
					drawScreen();
					context.fillText(text,convertMinutesToPixels(minutes),pos.y);
				}else{
					if(showingTooltip) {
						drawScreen();
						showingTooltip = false;
					}
				}
			}
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
	
	// checks if the coords are inside the main screen area, labels excluded
	function isInsideMainScreen(x,y) {
		return x >= zeroLineXOffset && x <= (zeroLineXOffset + mainScreenWidth)
				&& y >= startY && y <= (startY + mainScreenHeight);
	}
}

function drawScreen() {
	drawFrame();
	context.translate(leftX,topY);
	drawBackground();
	
	drawTrips(tripsModel);
}

function canvasSupport() {
	return Modernizr.canvas;
}