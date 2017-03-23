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

$dir = $_POST["dir"];

mkdir($dir);

die("success");

?>