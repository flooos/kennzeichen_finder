<?php 
require_once("../UserPie/models/config.php");

if(isset($_POST['id']))
	$db->sql_query("DELETE FROM likeplace WHERE id = '".$_POST['id']."' AND user='".$loggedInUser->user_id."'");
elseif(isset($_POST['plate']))
	$db->sql_query("DELETE FROM likeplace WHERE plate = '".$_POST['plate']."' AND user='".$loggedInUser->user_id."'");

print json_encode(1);
?>