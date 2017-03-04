<?php

session_start();

if (!isset($_SESSION["loggedIn"]) || $_SESSION["loggedIn"] != "true")
{
    die("Permission Denied");
}

$tmpFile = $_FILES["file"]['tmp_name'];
$file = $_FILES["file"]["name"];
$dir = $_POST["dir"];

if (move_uploaded_file($tmpFile, $dir."/".$file))
{
    die("success");
}
else
{
    die("upload failed");
}

?>