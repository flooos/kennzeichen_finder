<?php 
require_once("../UserPie/models/config.php");

$db->sql_query("SELECT * FROM comment INNER JOIN userpie_users ON comment.user=userpie_users.user_id WHERE comment.plate = '".$_POST['plate']."' ORDER BY comment.id DESC");
$dbRes = $db->sql_fetchrowset();

print json_encode($dbRes);
?>