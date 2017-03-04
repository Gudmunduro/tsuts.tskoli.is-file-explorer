<?php
session_start();

if (!isset($_SESSION["loggedIn"]) || $_SESSION["loggedIn"] != "true")
{
    die("Permission Denied");
}

$text = $_POST["text"];
$dir = $_POST["dir"];

echo $dir;
echo "      ".$text."       ";

file_put_contents($dir, $text);

if (file_get_contents($dir) == $text)
{
    die("success");
}
else
{
    die("Error: Saving failed");
}

?>