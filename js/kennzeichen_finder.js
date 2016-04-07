$(document).ready(function() {
	init();
});

function init() {
	checkLoginStatus();
}

//Nach Kennzeichenkürzel suchen
function checkPlate() {
	$.ajax({
		url: "inc/getPlateInfo.php",
		type: "POST",
		dataType:'json',
		data: {"plate":encodeURIComponent($("#plate").val().toUpperCase())},
		success: function(obj){
			if(!$.isEmptyObject(obj)) {
				$("#result").html('<div class="county">'+obj[0].county+'</div><div class="state">'+obj[0].state+'</div><div class="actionList"><span class="myLike"><span class="laterAuthenticated"><button type="button" class="btn btn-default btn-xs" onClick="likePlace()"><span class="glyphicon glyphicon-heart-empty" aria-hidden="true"></span> Gefällt mir</button>&nbsp;&nbsp;</span></span><span class="likePlace"><span class="likePlaceAmount">0-</span> gefällt dieser Ort</span></div>');
				initMap(obj[0].county+' '+obj[0].state);
				checkMyLike();
				getPlaceLikes();
				getComments();
				$('.commentRow').show();
				$('.defaultRow').hide();
				$('.resultRow').show();
				google.maps.event.trigger(map, 'resize');
				checkLoginStatus();
			}
			else {
				$('#comments').html('');
				$('.commentRow').hide();
				$('.defaultRow').show();
				$('.resultRow').hide();
			}
		}
	});
}

//Ortsbezogene Gefällt mir-Angabe speichern
function likePlace() {
	$.ajax({
		url: "inc/likePlace.php",
		type: "POST",
		dataType:'json',
		data: {"plate":encodeURIComponent($("#plate").val().toUpperCase())},
		success: function(obj){
			checkMyLike();
			getPlaceLikes();
		}
	});	
}

//Ortsbezogene Gefällt mir-Angabe entfernen
function dontLikePlace(plate) {
	if(plate)
		dataVal = {"plate":encodeURIComponent(plate.replace(/\s/g,"").toUpperCase())};
	else
		dataVal = {"plate":encodeURIComponent($("#plate").val().toUpperCase())};
	$.ajax({
		url: "inc/dontLikePlace.php",
		type: "POST",
		dataType:'json',
		data: dataVal,
		success: function(obj){
			checkMyLike();
			getPlaceLikes();
		}
	});	
}

//Überprüfen ob eigener Account unter ortsbezoge Gefällt mir-Angabe ist
function checkMyLike() {
	$.ajax({
		url: "inc/checkMyLike.php",
		type: "POST",
		dataType:'json',
		data: {"plate":encodeURIComponent($("#plate").val().toUpperCase())},
		success: function(obj){
			if(!$.isEmptyObject(obj)) {
				$('.myLike').html('<span class="laterAuthenticated"><button type="button" class="btn btn-primary btn-xs" onClick="dontLikePlace()"><span class="glyphicon glyphicon-heart" aria-hidden="true"></span> Dir gefällt das</button>&nbsp;&nbsp;</span>');
			}
			else {
				$('.myLike').html('<span class="laterAuthenticated"><button type="button" class="btn btn-default btn-xs" onClick="likePlace()"><span class="glyphicon glyphicon-heart-empty" aria-hidden="true"></span> Gefällt mir</button>&nbsp;&nbsp;</span>');				
			}
		}
	});	
}

//Anzahl an ortsbezogenen Gefällt mir-Angaben auslesen
function getPlaceLikes() {
	$.ajax({
		url: "inc/getPlaceLikes.php",
		type: "POST",
		dataType:'json',
		data: {"plate":encodeURIComponent($("#plate").val().toUpperCase())},
		success: function(obj){
			if(!$.isEmptyObject(obj)) {
				$('.likePlaceAmount').html(obj.amount);
			}
		}
	});	
}

//Alle Kommentare passend zum Ergebnis ausgeben
function getComments() {
	$.ajax({
		url: "inc/getComments.php",
		type: "POST",
		dataType:'json',
		data: {"plate":encodeURIComponent($("#plate").val().toUpperCase())},
		success: function(obj){
			$('#comments').html('<div id="commentsData"></div>');
			$.each(obj, function (key, data) {
				hour = data.date.substr(11,2)+':';
				minute = data.date.substr(14,2)+' Uhr';
				day = data.date.substr(8,2)+'.';
				month = data.date.substr(5,2)+'.';
				year = data.date.substr(0,4)+' um ';
    			$('#commentsData').append('<div class="bg-info commentOuter"><div class="left"><img src="img/user.svg" alt="User" class="img-circle userImage"></div><div class="left commentFullWidth"><div class="commentName"><xmp>'+data.username+'</xmp></div><div class="commentText"><xmp>'+decodeURIComponent(data.text)+'</xmp></div><div class="commentDate">'+day+month+year+hour+minute+'</div></div><div class="clear"></div></div>');
			})
			setSizes();
		}
	});
}

//Neuen Kommentar speichern
function saveComment() {
	$.ajax({
		url: "inc/saveComment.php",
		type: "POST",
		dataType:'json',
		data: {"comment":encodeURIComponent($("[name=comment]").val()),"plate":encodeURIComponent($("#plate").val().toUpperCase())},
		success: function(obj) {
			emptyCommentField('',true);
			$('.selectedCommentArea').hide();
			getComments();
		}
	});
}

//Wenn Fenstergröße geändert wird führe Funktion aus
$(window).on('resize', function(){
	setSizes();
});

//Verändere Breite des Kommentartexts, des Kommentareingabefelds und positioniere Ergebnistext
function setSizes() {
	$('#commentArea').css('width',$(".commentRow").width()-95);
	$('.commentFullWidth').css('width',$(".commentRow").width()-105);
	if($(".resultRow").height()<=300) {
		$('#result').css('padding',$(".resultRow").height()-$(".resultRow").height()/2-54+'px 0 0 75px');
	}
	else
		$('#result').css('padding','15px 15px 0 15px');
}

//Öffne Protokoll
function getProtocol(dontReopen) {
	$.ajax({
		url: "inc/getProtocol.php",
		type: "POST",
		dataType:'json',
		data: {},
		success: function(obj) {
			$('#protocolData').html('');
			$.each(obj['comment'], function (key, data) {
				hour = data.date.substr(11,2)+':';
				minute = data.date.substr(14,2)+' Uhr';
				day = data.date.substr(8,2)+'.';
				month = data.date.substr(5,2)+'.';
				year = data.date.substr(0,4)+' um ';
				comment = decodeURIComponent(data.text);
				county = data.county;
				if(county.length>15)
					county = county.substr(0,15)+' ...';
				if(comment.length>15)
					comment = comment.substr(0,15)+' ...';
    			$('#protocolData').append('<tr><td>'+day+month+year+hour+minute+'</td><td>'+county+'</td><td><xmp>'+comment+'</xmp></td><td><span onClick="editComment('+data.id+')"><button type="button" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button></span>&nbsp;<span onClick="deleteActivity('+data.id+')"><button type="button" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></span></td></tr>');
			})
			$('#protocolDataLikes').html('');
			$.each(obj['likeplace'], function (key, data) {
				hour = data.date.substr(11,2)+':';
				minute = data.date.substr(14,2)+' Uhr';
				day = data.date.substr(8,2)+'.';
				month = data.date.substr(5,2)+'.';
				year = data.date.substr(0,4)+' um ';
				county = data.county;
				state = data.state;
				if(county.length>15)
					county = county.substr(0,15)+' ...';
				if(state.length>15)
					state = state.substr(0,15)+' ...';
    			$('#protocolDataLikes').append('<tr><td>'+day+month+year+hour+minute+'</td><td>'+county+'</td><td>'+state+'</td><td><span onClick="dontLikePlace(\''+data.plate+'\'); getProtocol('+true+')"><button type="button" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></span></td></tr>');
			})
			if(!dontReopen)
				$('#protocolDialog').modal('toggle');
		}
	});
}

//Lade Kommentardetails in Dialogbox
function editComment(id) {
	$.ajax({
		url: "inc/getComment.php",
		type: "POST",
		dataType:'json',
		data: {"id":id},
		success: function(obj){
			$('[name=editComment]').val(decodeURIComponent(obj.text));
			$('[name=commentId]').val(id);
			$('#protocolDialog').modal('toggle');
			$('#editComment').modal('toggle');
		}
	});
}

//Speichere/Aktualisiere editierten Kommentar
function saveEditComment() {
	$.ajax({
		url: "inc/saveEditComment.php",
		type: "POST",
		dataType:'json',
		data: {"id":encodeURIComponent($('[name=commentId]').val()),"text":encodeURIComponent($('[name=editComment]').val())},
		success: function(obj){
			$('#editComment').modal('toggle');
			getProtocol();
			if($('.commentRow').is(":visible")) {
				getComments();
			}
		}
	});
}

//Wechsle Ansicht im Protokolldialog zu Kommentare oder Gefällt mir-Angaben
function protocolSwitchTo(choice) {
	if(choice=="comments") {
		$('#protocolComments').show();
		$('#protocolLikes').hide();
		$('#navProtocolComments').attr('class','active');
		$('#navProtocolLikes').removeAttr('class');
	}
	else if(choice=="likes") {
		$('#protocolComments').hide();
		$('#protocolLikes').show();
		$('#navProtocolComments').removeAttr('class');
		$('#navProtocolLikes').attr('class','active');
	}
}

//Lösche Kommentar
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

//Leere das Kommentareingabefeld
function emptyCommentField(value, ignore) {
	if(value=='Kommentar eingeben ...' || ignore)
		$('[name=comment]').val('');
	$('.selectedCommentArea').show();
}

//Wechsle Dvon Registierbox zu Loginbox
function switchToLogin() {
	$('#registerDialog').modal('toggle'); 
	$('#loginDialog').modal('toggle'); 
}

//Gebe Username und setzte ihn in die Navigation
function getUsername() {
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

//Überprüfe ob Login besteht, wenn ja blende alle Interaktionselemente ein, wenn nicht verstecken
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
				$('.laterAuthenticated').show();
				getUsername();
				if($('.resultRow').is(":visible")) {
					checkMyLike();
					getPlaceLikes();
				}
			}
			else {
				$('.notauthenticated').show(); 
				$('.authenticated').hide(); 
				$('.laterAuthenticated').hide(); 
			}
		}
	});
}

//Nutzer einloggen alte Session löschen und neue setzen
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
				$('[name=username]').val('');
				$('[name=password]').val('');
			}
			else {
				$('#loginError').html('');
				$('#loginError').show();
				$.each(obj.errors, function (key, data) {
					$('#loginError').append('<p class="bg-warning error">&middot; '+data+'</p>');
				})
			}
		}
	});
}

//Nutzer registrieren
function doRegister() {
	$.ajax({
		url: "inc/userPie_doRegister.php",
		type: "POST",
		dataType:'json',
		data: {"username":encodeURIComponent($("[name=reg_username]").val()),"password":$("[name=reg_password]").val(),"passwordc":$("[name=reg_passwordc]").val(),"email":$("[name=reg_email]").val()},
		success: function(obj){
			if(obj.registered) {
				$('#registerError').hide();
				$('.registerForm').hide();
				$('.registerDone').show();
				$('[name=reg_username]').val('');
				$('[name=reg_password]').val('');
				$('[name=reg_passwordc]').val('');
				$('[name=reg_email]').val('');
			}
			else {
				$('#registerError').html('');
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

//Ausloggen und alle Sessions zerstören
function doLogout() {
	$.ajax({
		url: "inc/userPie_doLogout.php",
		type: "POST",
		dataType:'json',
		data: {},
		success: function(obj){
			if(obj.loggedOut) {
				$('#logoutSuccessDialog').modal('toggle'); 
				checkLoginStatus();
			}
		}
	});
}

//Zeige/Blende Logindialog aus
function showLoginDialog() {
	$('#loginDialog').modal('toggle'); 
}

function showRegisterDialog() {
	$('#registerDialog').modal('toggle'); 
}

//Initialisiere Google Maps
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

//Finde Koordinaten zur Ergebnisstadt und -landkreis
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