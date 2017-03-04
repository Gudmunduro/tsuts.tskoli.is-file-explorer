<?php
session_start();

$passwd = $_POST["passwd"];

if ($passwd == "password")
{
    $_SESSION["loggedIn"] = "true";
    die("success");
}
else
{
    die("Login Failed");
}




?>