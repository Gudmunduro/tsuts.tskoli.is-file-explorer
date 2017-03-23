<?php
/* This program is free software. It comes without any warranty, to
     * the extent permitted by applicable law. You can redistribute it
     * and/or modify it under the terms of the Do What The Fuck You Want
     * To Public License, Version 2, as published by Sam Hocevar. See
     * http://www.wtfpl.net/ for more details. */
  session_start();
  if (empty($_GET["filename"]))
  {
     die("Downlaod Failed!");
  }

  $fileName = $_GET["filename"];
  $fileDir = $_GET["dir"];
  if (empty($_SESSION["loggedIn"]) || $_SESSION["loggedIn"] != "true")
  {
       function contains($str, $cont)
       {
         return strpos($str, $cont) !== FALSE;
       }


       $loc2 = $fileDir;
       

       if (contains($loc2, "."))
       {
         $loc2 = str_replace(".", "", $loc2);
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



       if (contains($loc2, "/utsdata/2T/1404002030/FileMgr"))
       {
         die("Access Denied");
       }
  }

  header("Content-type: application/others");
  header("Content-disposition: attachment;filename=$fileName");
  readfile($fileDir."/".$fileName);
?>