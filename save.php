<?php
/* This program is free software. It comes without any warranty, to
     * the extent permitted by applicable law. You can redistribute it
     * and/or modify it under the terms of the Do What The Fuck You Want
     * To Public License, Version 2, as published by Sam Hocevar. See
     * http://www.wtfpl.net/ for more details. */
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