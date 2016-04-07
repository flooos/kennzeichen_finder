<?php 
require_once("../UserPie/models/config.php");

//$sql = "INSERT INTO '".$db_table_prefix."users' ('username','username_clean') VALUES ('','')";
//return $db->sql_query($sql);

$db->sql_query("INSERT INTO likeplace (user,plate) VALUES('".$loggedInUser->user_id."', '".trim($_POST['plate'])."')");

print json_encode(1);
?>