function TripsModel(idGen) {

	/**
	* private properties
	*/
	
	var idGenerator = idGen;
	var trips = new Array(); // all the trips, unordered
	var tripsByLevel = new Array(); // trips in every vertical section, ordered by start time
	
	/**
	* public methods
	*/
	
	// creates and adds a trip based on the informed x,y coordinates
	this.addTrip = function(x,y) {
		var startTime = convertPixelsToMinutes(x);
		var time = getMinutes("01:00");
		var level = getVerticalLevel(y);
		var color = "blue";
		addTripByMinutes(startTime, time, level, color);
	};
	
	// imports an already existing trip into the model
	this.importTrip = function(trip) {
		addTripToInternalStructs(trip);
	}
	
	// returns all the trips, unordered
	this.getTrips = function() {
		return trips;
	};
	
	/**
	* private methods
	*/
	
	// creates and adds a trip with the informed properties
	function addTripByMinutes(startTime, time, level, color) {
		var trip = new Trip(idGenerator.getNextId(), startTime, time, level, color);
		addTripToInternalStructs(trip);
	};

	// adds the trip to the internal structs of the model
	function addTripToInternalStructs(trip) {
		trips.push(trip);
		addTripToLevel(trip);
	}
	
	// adds the informed trip to the tripsByLevel map
	function addTripToLevel(trip) {
		var t = tripsByLevel[trip.getLevel()];
		if(!t) {
			t = new Array();
		}
		for(var i=0;i<t.length;i++) {
			if(t[i].getStartTime() > trip.getStartTime()) {
				break;
			}
		}
		t[i] = trip;
		tripsByLevel[trip.getLevel()] = t;
	};
}

function Trip(id, startTime, time, level, color) {
	var id = id;
	var startTime = startTime;
	var time = time;
	var level = level;
	var color = color;
	
	this.getId = function() {
		return id;
	}
	
	this.getStartTime = function() {
		return startTime;
	}
	
	this.getTime = function() {
		return time;
	}
	
	this.getLevel = function() {
		return level;
	}
	
	this.getColor = function() {
		return color;
	}
}