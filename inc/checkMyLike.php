<?php 
require_once("../UserPie/models/config.php");

$db->sql_query("SELECT * FROM likeplace WHERE plate = '".$_POST['plate']."' AND user = '".$loggedInUser->user_id."'");
$dbRes = $db->sql_fetchrowset();

print json_encode($dbRes);
?>