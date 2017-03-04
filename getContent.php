<?php
session_start();

       function contains($str, $cont)
       {
         return strpos($str, $cont) !== FALSE;
       }
       $location = $_POST["dir"];
       $loc2 = $location;
       if (empty($_SESSION["loggedIn"]) || $_SESSION["loggedIn"] != "true")
       {
         if (contains($loc2, "/."))
        {
         $loc2 = str_replace("/.", "", $loc2);
        }



       if (contains($loc2, "/////"))
       {
         $loc2 = str_replace("/////", "/", $loc2);
       }
       if (contains($loc2, "////"))
       {
         $loc2 = str_replace("////", "/", $loc2);
       }
       if (contains($loc2, "///"))
       {
         $loc2 = str_replace("///", "/", $loc2);
       }
       if (contains($loc2, "//"))
       {
         $loc2 = str_replace("//", "/", $loc2);
       }
       if (contains($loc2, "/utsdata/2T/1404002030/FileMgr/"))
       {
         die("Access Denied");
       }
       }


        die(file_get_contents( $location ));
    ?>