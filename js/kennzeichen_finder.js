$(document).ready(function() {
	//intialize();
});

function checkPlate() {
	$.ajax({
		url: "inc/getPlateInfo.php",
		type: "POST",
		dataType:'json',
		data: {"plate":encodeURIComponent($("#plate").val())},
		success: function(obj){
		if(obj.found)
			$("#result").html(obj.state+'<br />'+obj.county);
		else
			$("#result").html("");
		}
	});
}