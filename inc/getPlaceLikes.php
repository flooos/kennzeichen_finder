<?php 
require_once("../UserPie/models/config.php");

$db->sql_query("SELECT * FROM likeplace WHERE plate = '".$_POST['plate']."'");
$count = count($db->sql_fetchrowset());

$result = array( "amount" => $count );

print json_encode($result);
?>