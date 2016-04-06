<?php

$server='localhost';
$username='root';
$password='';
$database='kennzeichen_finder';
mysql_connect($server,$username,$password);
$mysqli = new mysqli($server,$username,$password,$database);mysql_query("SET NAMES 'utf8'");
mysql_close();

$mysqli->set_charset("utf8");