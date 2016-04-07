<?php 
require_once("../UserPie/models/config.php");

$db->sql_query("SELECT * FROM comment co INNER JOIN userpie_users us ON co.user=us.user_id WHERE co.plate = '".$_POST['plate']."' ORDER BY co.id DESC");
$dbRes = $db->sql_fetchrowset();

print json_encode($dbRes);
?>