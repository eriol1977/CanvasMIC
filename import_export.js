$(function() {
	$("#open_file").change(function(e){
		var files = e.target.files;
		if(files) {
			readFile(files[0]);
		}
	});
});

function readFile(file) {
	var textType = /text.*/;
	if (file.type.match(textType)) {
		var reader = new FileReader();
		// file content loading is assychronous
		reader.onload = function(e) {
			alert(reader.result);
		}
		reader.readAsText(file);  
	} else {
		alert("File not supported!");
	}
}