<?php
	/*
		UserPie Version: 1.0
		http://userpie.com
		

	*/
	include("../UserPie/models/config.php");
	
	//Log the user out
	if(isUserLoggedIn()) $loggedInUser->userLogOut();

	if(!empty($websiteUrl)) 
	{
		$add_http = "";
		
		if(strpos($websiteUrl,"http://") === false)
		{
			$add_http = "http://";
		}
	
		echo '{"loggedOut":true}';
		die();
	}
	else
	{
		echo '{"loggedOut":true}';
		die();
	}	
?>


