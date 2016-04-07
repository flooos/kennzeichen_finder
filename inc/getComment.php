<?php 
require_once("../UserPie/models/config.php");

$db->sql_query("SELECT * FROM comment WHERE id = '".$_POST['id']."'");
$dbRes = $db->sql_fetchrowset();

$text = array( "text" => $dbRes[0]['text'] );

print json_encode($text);
?>