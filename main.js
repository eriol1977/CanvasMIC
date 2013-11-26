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

	// left click adds a trip
	$('#canvasOne').click(function(e){
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
	});

	// avoids automatic context menu opening on right click, while removing a trip
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