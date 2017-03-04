<?php

session_start();

if (!isset($_SESSION["loggedIn"]) || $_SESSION["loggedIn"] != "true")
{
    die("Permission Denied");
}

$dir = $_POST["dir"];

$file = touch($dir);

die("success");

?>