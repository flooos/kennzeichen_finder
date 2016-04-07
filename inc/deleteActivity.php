<?php 
require_once("../UserPie/models/config.php");

$db->sql_query("DELETE FROM comment WHERE id = '".$_POST['id']."' AND user='".$loggedInUser->user_id."'");

print json_encode($dbRes);
?>