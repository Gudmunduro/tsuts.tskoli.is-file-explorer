<?php
session_start();

if (!isset($_SESSION["loggedIn"]) || $_SESSION["loggedIn"] != "true")
{
    die("Permission Denied");
}

$dir = $_POST["dir"];

unlink($dir);

if (!file_exists($dir))
{
    die("success");
}
else
{
    die("Download failed!");
}


?>