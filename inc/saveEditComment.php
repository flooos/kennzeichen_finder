<?php 
require_once("../UserPie/models/config.php");

$db->sql_query("UPDATE comment SET text = '".$_POST['text']."' WHERE id = '".$_POST['id']."' AND user = '".$loggedInUser->user_id."'");

print json_encode(1);
?>