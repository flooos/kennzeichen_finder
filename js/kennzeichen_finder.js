$(document).ready(function() {
	init();
});

function init() {
	checkLoginStatus();
}

function checkPlate() {
	$.ajax({
		url: "inc/getPlateInfo.php",
		type: "POST",
		dataType:'json',
		data: {"plate":encodeURIComponent($("#plate").val())},
		success: function(obj){
			if(obj.found) {
				$("#result").html(obj.county+'<br />'+obj.state);
				console.log("ausgeführt");
				initMap(obj.county+' '+obj.state);
			}
			else
				$("#result").html("Starten Sie Ihre Suche");
		}
	});
}

function doLogin() {
	$.ajax({
		url: "inc/userPie_doLogin.php",
		type: "POST",
		dataType:'json',
		data: {"username":encodeURIComponent($("[name=username]").val()),"password":encodeURIComponent($("[name=password]").val()),"remember_me":encodeURIComponent($("[name=remember_me]").prop('checked'))},
		success: function(obj){
			if(obj.loggedIn) {
				console.log("eingeloggt");
				checkLoginStatus();
				$('#loginDialog').modal('hide'); 
			}
			else
				console.log("nicht eingeloggt");
		}
	});
}

function doRegister() {
	$.ajax({
		url: "inc/userPie_doRegister.php",
		type: "POST",
		dataType:'json',
		data: {"username":encodeURIComponent($("[name=reg_username]").val()),"password":encodeURIComponent($("[name=reg_password]").val()),"passwordc":encodeURIComponent($("[name=reg_passwordc]").val()),"email":$("[name=reg_email]").val()},
		success: function(obj){
			if(obj.registered) {
				console.log("registriert");
				$('#registerError').hide();
				$('.registerForm').hide();
				$('.registerDone').show();
			}
			else {
				console.log("nicht registriert");
				$('#registerError').show();
				$('#registerError').html(obj.errors);
				$('.registerForm').show();
				$('.registerDone').hide();
			}
		}
	});
}


function doLogout() {
	$.ajax({
		url: "inc/userPie_doLogout.php",
		type: "POST",
		dataType:'json',
		data: {},
		success: function(obj){
			if(obj.loggedOut) {
				console.log("ausgeloggt");
				$('#logoutSuccess').modal('toggle'); 
				checkLoginStatus();
			}
			else
				console.log("nicht ausgeloggt");
		}
	});
}

function checkLoginStatus() {
	$.ajax({
		url: "inc/userPie_checkLoginStatus.php",
		type: "POST",
		dataType:'json',
		data: {"username":encodeURIComponent($("[name=username]").val()),"password":encodeURIComponent($("[name=password]").val()),"remember_me":encodeURIComponent($("[name=remember_me]").prop('checked'))},
		success: function(obj){
			if(obj.loggedIn) {
				$('.notauthenticated').hide(); 
				$('.authenticated').show(); 
			}
			else {
				$('.notauthenticated').show(); 
				$('.authenticated').hide(); 
			}
		}
	});
}

function showLoginDialog() {
	$('#loginDialog').modal('toggle'); 
}

function showRegisterDialog() {
	$('#registerDialog').modal('toggle'); 
}

function initMap(address) {
	if($('#plate').val()!='') {
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 8,
			center: {lat: -34.397, lng: 150.644},
    		disableDefaultUI: true
		});
		var geocoder = new google.maps.Geocoder();
		geocodeAddress(geocoder, map, address);
	}
}

function geocodeAddress(geocoder, resultsMap, address) {
	geocoder.geocode({'address': address}, function(results, status) {
		if (status === google.maps.GeocoderStatus.OK) {
			resultsMap.setCenter(results[0].geometry.location);
			var marker = new google.maps.Marker({
				map: resultsMap,
				position: results[0].geometry.location
			});
		} else {
			alert('Geocode was not successful for the following reason: ' + status);
		}
	});
}