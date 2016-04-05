<?php

$server='localhost';
$username='root';
$password='root';
$database='scotchbox';
mysqli_connect($server,$username,$password);
$mysqli = new mysqli($server,$username,$password,$database);

$mysqli->set_charset("utf8");