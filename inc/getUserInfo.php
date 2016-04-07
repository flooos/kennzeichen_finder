<?php 
require_once("../UserPie/models/config.php");

$result = $loggedInUser;
print json_encode($result);

?>