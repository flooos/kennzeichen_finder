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
			if(!$.isEmptyObject(obj)) {
				$("#result").html('<div class="county">'+obj[0].county+'</div><div class="state">'+obj[0].state+'</div>');
				initMap(obj[0].county+' '+obj[0].state);
				$('#map').show();
				getComments();
				$('.commentRow').show();
				$('.defaultRow').hide();
				$('.resultRow').show();
			}
			else {
				$("#result").html("Starten Sie Ihre Suche");
				$('#map').hide();
				$('#comments').html('');
				$('.commentRow').hide();
				$('.defaultRow').show();
				$('.resultRow').hide();
			}
		}
	});
}

function doLogin() {
	$.ajax({
		url: "inc/userPie_doLogin.php",
		type: "POST",
		dataType:'json',
		data: {"username":encodeURIComponent($("[name=username]").val()),"password":$("[name=password]").val()},
		success: function(obj){
			if(obj.loggedIn) {
				checkLoginStatus();
				$('#loginError').hide();
				$('#loginDialog').modal('toggle'); 
			}
			else {
				$('#loginError').show();
				$.each(obj.errors, function (key, data) {
					$('#loginError').append('<p class="bg-warning error">&middot; '+data+'</p>');
				})
			}
		}
	});
}

function switchToLogin() {
	$('#registerDialog').modal('toggle'); 
	$('#loginDialog').modal('toggle'); 
}

function getUsername() {
	console.log("username");
	$.ajax({
		url: "inc/getUserInfo.php",
		type: "POST",
		dataType:'json',
		data: {},
		success: function(obj){
			$('.username').html(obj.display_username);
		}
	});
}

function doRegister() {
	$.ajax({
		url: "inc/userPie_doRegister.php",
		type: "POST",
		dataType:'json',
		data: {"username":encodeURIComponent($("[name=reg_username]").val()),"password":$("[name=reg_password]").val(),"passwordc":$("[name=reg_passwordc]").val(),"email":$("[name=reg_email]").val()},
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
				$.each(obj.errors, function (key, data) {
					$('#registerError').append('<p class="bg-warning error">&middot; '+data+'</p>');
				})
				$('.registerForm').show();
				$('.registerDone').hide();
			}
		}
	});
}

function getComments() {
	$.ajax({
		url: "inc/getComments.php",
		type: "POST",
		dataType:'json',
		data: {"plate":encodeURIComponent($("#plate").val())},
		success: function(obj){
			
		setSizes();
			$('#comments').html('<div id="commentsData"></div>');
			$.each(obj, function (key, data) {
				hour = data.date.substr(11,2)+':';
				minute = data.date.substr(14,2)+' Uhr';
				day = data.date.substr(8,2)+'.';
				month = data.date.substr(5,2)+'.';
				year = data.date.substr(0,4)+' um ';
    			$('#commentsData').append('<div class="bg-info commentOuter"><div class="left"><img src="img/user.svg" alt="User" class="img-circle userImage"></div><div class="left"><div class="commentName">'+data.username+'</div><div class="commentText">'+decodeURIComponent(data.text)+'</div><div class="commentDate">'+day+month+year+hour+minute+'</div></div><div class="clear"></div></div>');
			})
			
			/*$.each(obj, function (key, data) {
    			$('#comments').append(key);
    			$.each(data, function (index, data) {
    				$('#comments').append(data);
    			})
			})*/
		}
	});
}

$(window).on('resize', function(){
	setSizes();
});

function setSizes() {
	$('#commentArea').css('width',$(".commentRow").width()-95);
	if($(".resultRow").height()<=300) {
		$('#result').css('padding',$(".resultRow").height()-$(".resultRow").height()/2-38+'px 0 0 75px');
	}
	else
		$('#result').css('padding','15px 15px 0 15px');
}

function saveComment() {
	$.ajax({
		url: "inc/saveComment.php",
		type: "POST",
		dataType:'json',
		data: {"comment":encodeURIComponent($("[name=comment]").val()),"plate":encodeURIComponent($("#plate").val())},
		success: function(obj) {
			emptyCommentField('',true);
			$('.selectedCommentArea').hide();
			getComments();
		}
	});
}

function getProtocol(dontReopen) {
	$.ajax({
		url: "inc/getProtocol.php",
		type: "POST",
		dataType:'json',
		data: {},
		success: function(obj) {
			console.log("dosmthg");
			$('#protocolData').html('');
			$.each(obj, function (key, data) {
    			$('#protocolData').append('<div class="protocolBox">'+data.username+' '+decodeURIComponent(data.text)+' <span onClick="deleteActivity('+data.id+')">[x]</span>'+'</div>');
			})
			if(!dontReopen)
				$('#protocolDialog').modal('toggle');
		}
	});
}

function deleteActivity(id) {
	$.ajax({
		url: "inc/deleteActivity.php",
		type: "POST",
		dataType:'json',
		data: {"id":id},
		success: function(obj) {
			getProtocol(true);
		}
	});
}

function emptyCommentField(value, ignore) {
	if(value=='Kommentar eingeben ...' || ignore)
		$('[name=comment]').val('');
	$('.selectedCommentArea').show();
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
				$('#logoutSuccessDialog').modal('toggle'); 
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
		data: {},
		success: function(obj){
			if(obj.loggedIn) {
				$('.notauthenticated').hide(); 
				$('.authenticated').show();
				getUsername();
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