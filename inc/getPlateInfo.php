<?php 
require_once("../data/mysql.php");

$result = $mysqli->query("SELECT * FROM plate WHERE plate = '".$_POST['plate']."'");
$row = mysqli_fetch_array($result);
if($result->num_rows==1)
	echo '{"found":true,"plate":"'.$row['plate'].'","county":"'.$row['county'].'","state":"'.$row['state'].'"}';
else
	echo '{"found":false}';
?>