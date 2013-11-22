function IdGenerator() {

	var lastId = 0;

	this.getNextId = function() {
		return ++lastId;
	}

}