function Importer(tripsMod) {

	var tripsModel = tripsMod;

	/**
	* Imports a csv file with trip data
	*/
	this.importFile = function(file) {
		//FIXME the input field is now filtering the files extensions to csv
		//var textType = "/*.csv/";
		//if (file.type.match(textType)) {
			var reader = new FileReader();
			// file content loading is assychronous
			reader.onload = function(e) {
				var errors = importFileContent(reader.result);
				drawScreen();
				if(errors) {
					alert(errors.join("\n\n"));
				}
			}
			reader.readAsText(file);  
		// } else {
			// alert("File not supported!");
		// }
	}

	/**
	* Imports the csv content, following this format for each line:
	* id;startTime;endTime;level;color
	*/
	function importFileContent(content) {
		var id;
		var startTime;
		var endTime;
		var time;
		var level;
		var color;
		var line;
		var errors;
		var lines = content.split(/\r\n|\r|\n/g); // stores each line of content into an array
		for(var i=0; i<lines.length; i++) {
			line = lines[i].split(";");
			if(line.length == 5) { // avoids badly formatted lines
				id = line[0];
				startTime = getMinutes(line[1]);
				endTime = getMinutes(line[2]);
				time = endTime - startTime;
				level = line[3];
				color = line[4];
				try {
					tripsModel.importTrip(new Trip(id, startTime,time,level,color));
				}catch(e){
					if(e instanceof MICException) {
						if(!errors) {
							errors = new Array();
						}
						errors.push(e);
					}
				}
			}
		}
		return errors;
	}
}

function Exporter(tripsMod) {

	var tripsModel = tripsMod;
	
	this.exportToFile = function() {
		window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
		window.requestFileSystem(window.TEMPORARY, 5*1024*1024 /*5MB*/, onInitFs, errorHandler);
	
		// http://www.html5rocks.com/en/tutorials/file/filesystem/
	
		//alert(tripsModel.getTrips().join("\n"));
	}
	
	function onInitFs(fs) {
		alert('Opened file system: ' + fs.name);
	}
	
	function errorHandler(e) {
	  var msg = '';

	  switch (e.name) {
		case "SecurityError":
		  msg = 'Erro de segurança!';
		  break;
		default:
		  msg = 'Erro desconhecido';
		  break;
	  };

	  alert(msg);
	}
}