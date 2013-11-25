$(document).ready(function(){
  $("#open_toolbar").click(function(){
	$("#toolbar").slideToggle("fast","swing");
	if($("#open_toolbar_icon").attr("src") == "icons/down.png") {
		$("#open_toolbar_icon").attr("src","icons/up.png");
	}else{
		$("#open_toolbar_icon").attr("src","icons/down.png");
	}
  });
  $("#config").click(function(){
	alert("config");
  });
  $("#print").click(function(){
	//FIXME: how to always print all of the canvas, with any zoom value?
	window.open(theCanvas.toDataURL(),"canvasImage","left=0,top=0,width=" +
				theCanvas.width + ",height=" + theCanvas.height +
				",toolbar=0,resizable=0");
  });
  $("#open").click(function(){
	$("#open_file").click(); // opens hidden input file field
  });
  $("#save").click(function(){
	alert("save");
  });
});

// free icons: https://www.iconfinder.com/search/?q=iconset%3A16x16-free-toolbar-icons