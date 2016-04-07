<?php 
require_once("../UserPie/models/config.php");

$db->sql_query("SELECT * FROM plate WHERE plate = '".$_POST['plate']."'");
$dbRes = $db->sql_fetchrowset();

print json_encode($dbRes);
?>