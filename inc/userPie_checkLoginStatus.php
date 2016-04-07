<?php
	/*
		UserPie
		http://userpie.com
		

	*/
	require_once("../UserPie/models/config.php");
	
	//Prevent the user visiting the logged in page if he/she is already logged in
	if(isUserLoggedIn()) {
		$status = array( "loggedIn" => true );
		//die();
	}
	else
		$status = array( "loggedIn" => false );
		
	print json_encode($status);
?>