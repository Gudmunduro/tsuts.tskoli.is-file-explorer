<?php

session_start();

if (!isset($_SESSION["loggedIn"]) || $_SESSION["loggedIn"] != "true")
{
    die("Permission Denied");
}

$dir = $_POST["dir"];

mkdir($dir);

die("success");

?>