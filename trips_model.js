function TripsModel(idGen) {

	/**
	* private properties
	*/
	
	var idGenerator = idGen;
	var trips = new Array(); // all the trips, unordered
	var tripsByLevel = new Array(); // trips in every vertical section, ordered by start time
	var tempTrip = null; // used to temporary store trip values (must be nulled again after each use!)
	
	/**
	* public methods
	*/
	
	// creates and adds a trip, based on the informed x,y coordinates
	this.addTrip = function(x,y) {
		var startTime = convertPixelsToMinutes(x);
		var time = getMinutes("01:00");
		var level = getVerticalLevel(y);
		var color = "blue";
		addTripByMinutes(startTime, time, level, color);
	};
	
	// finds and removes a trip from the model, based on the informed x,y coordinates
	this.removeTrip = function(x,y) {
		var trip = findTrip(x,y);
		if(trip) {
			removeTripFromInternalStructs(trip);
		}
	}
	
	// imports an already existing trip into the model
	this.importTrip = function(trip) {
		addTripToInternalStructs(trip);
	}
	
	// returns all the trips, unordered
	this.getTrips = function() {
		return trips;
	};
	
	// selects a trip based on x,y screen coords
	this.selectTrip = function(x,y) {
		return findTrip(x,y);
	};
	
	// updates the start time and vertical level of the informed trip, based on new x,y screen coords
	// "validate" must be true when we want to render the change permanent
	this.dragTrip = function(trip,x,y,validate) {
		if(trip) {
			// saves the trip values into a clone the first time
			if(tempTrip == null) {
				tempTrip = new Trip(trip.getId(),trip.getStartTime(),trip.getTime(),trip.getLevel(),trip.getColor());
				removeTripFromLevel(trip); // the trip is removed from its original vertical level
				trip.setSelected(true);
			}
			// updates start time and vertical level
			trip.setStartTime(convertPixelsToMinutes(x));
			trip.setLevel(getVerticalLevel(y));
			// this is called when a validation is requested (for example, when we stop dragging a trip around the screen)
			if(validate) {
				try {
					addTripToLevel(trip); // tries to insert the trip into its new vertical level
				}catch(e){
					// if it fails, the trip goes back to its original values and level
					tempTrip.cloneInto(trip);
					addTripToLevel(trip);
				}
				trip.setSelected(false);
				tempTrip = null;
			}
		}
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
		addTripToLevel(trip);
		trips.push(trip);
	}
	
	// adds the informed trip to the tripsByLevel map
	function addTripToLevel(trip) {
		var levelTrips = tripsByLevel[trip.getLevel()];
		if(!levelTrips) {
			levelTrips = new Array();
		}
		for(var i=0;i<levelTrips.length;i++) {
			if(levelTrips[i].getStartTime() > trip.getStartTime()) {
				break;
			}
		}
		validateTripPosition(trip, levelTrips, i);
		levelTrips.splice(i,0,trip);
		tripsByLevel[trip.getLevel()] = levelTrips;
	};
	
	// removes the trip from the internal structs of the model
	function removeTripFromInternalStructs(trip) {
		removeTripFromLevel(trip)
		index = indexOf(trips,trip);
		trips.splice(index,1);
	}
	
	// removes the trip from the tripsByLevel map
	function removeTripFromLevel(trip) {
		var levelTrips = tripsByLevel[trip.getLevel()];
		var index = indexOf(levelTrips,trip);
		levelTrips.splice(index,1);
	}
	
	function validateTripPosition(trip, levelTrips, index) {
		// checks previous trip
		if(index > 0) {
			var previousTrip = levelTrips[index-1];
			if(previousTrip.getEndTime() > trip.getStartTime()) {
				throw new MICException("Há uma sobreposição de tempo no trilho " + trip.getLevel()
										+ " entre a viagem das " + getHourString(previousTrip.getStartTime())
										+ " e a nova, que começaria às " + getHourString(trip.getStartTime()) + ".");
			}
		}
		// checks next trip
		if(index < levelTrips.length) {
			var nextTrip = levelTrips[index]; // we haven't inserted the new trip yet, so we use the same index to check
			if(nextTrip.getStartTime() < trip.getEndTime()) {
				throw new MICException("Há uma sobreposição de tempo no trilho " + trip.getLevel()
										+ " entre a viagem das " + getHourString(nextTrip.getStartTime())
										+ " e a nova, que começaria às " + getHourString(trip.getStartTime()) + ".");
			}
		}
	}
	
	/**
	* returns the trip corresponding to x,y coords, or undefined
	*/
	function findTrip(x,y) {
		var level = getVerticalLevel(y);
		var levelTrips = tripsByLevel[level];
		if(levelTrips && levelTrips.length > 0) {
			var trip;
			var time = convertPixelsToMinutes(x);
			for(var i=0; i<levelTrips.length; i++) {
				trip = levelTrips[i];
				if(trip.getStartTime()<=time && trip.getEndTime()>=time) {
					return trip;
				}
			}
		}
		return undefined;
	}
	
	/**
	* Custom indexOfFunction to return object index based on its id value.
	* Obs: for this function to work, both the object and the objects inside the array must
	* expose a getId() method
	*/
	function indexOf(arr,objectWithId) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].getId() == objectWithId.getId()) {
				return i;
			}
		}
		return -1;
	}
}

function Trip(id, startTime, time, level, color) {
	var id = id;
	var startTime = startTime;
	var time = time;
	var level = level;
	var color = color;
	var selected = false;
	
	this.getId = function() {
		return id;
	}
	
	this.getStartTime = function() {
		return startTime;
	}
	
	this.getTime = function() {
		return time;
	}
	
	this.getEndTime = function() {
		return startTime + time;
	}
	
	this.getLevel = function() {
		return level;
	}
	
	this.getColor = function() {
		return color;
	}
	
	this.isSelected = function() {
		return selected;
	}
	
	this.setId = function(value) {
		id = value;
	}
	
	this.setStartTime = function(value) {
		startTime = value;
	}
	
	this.setTime = function(value) {
		time = value;
	}
	
	this.setColor = function(value) {
		color = value;
	}
	
	this.setLevel = function(value) {
		level = value;
	}
	
	this.setSelected = function(value) {
		selected = value;
	}
	
	this.cloneInto = function(anotherTrip) {
		anotherTrip.setId(id);
		anotherTrip.setStartTime(startTime);
		anotherTrip.setTime(time);
		anotherTrip.setLevel(level);
		anotherTrip.setColor(color);
		anotherTrip.setSelected(selected);
	}
	
	this.toString = function() {
		return "{" + id + "} " + getHourString(startTime) + " - " + getHourString(this.getEndTime()) + " lvl " + level;
	}
}