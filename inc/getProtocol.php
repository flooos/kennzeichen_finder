<?php 
require_once("../UserPie/models/config.php");

$db->sql_query("SELECT * FROM plate pl INNER JOIN comment co ON pl.plate=co.plate WHERE co.user='".$loggedInUser->user_id."' ORDER BY co.id DESC");
$dbRes = $db->sql_fetchrowset();

$db->sql_query("SELECT * FROM likeplace lp INNER JOIN plate pl ON lp.plate=pl.plate WHERE lp.user='".$loggedInUser->user_id."' ORDER BY lp.id DESC");
$dbRes2 = $db->sql_fetchrowset();

$result = array( "comment" => $dbRes, "likeplace" => $dbRes2 );

print json_encode($result);
?>