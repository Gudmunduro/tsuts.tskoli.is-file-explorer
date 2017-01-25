<!doctype html>
<html>
  <head>
  </head>
  <body>
   <?php
     if (!isset($_GET["filename"]))
	 {
	   die();
	 }
     $filename = $_GET["filename"];
	 $dir = $_GET["dir"];

	 echo "<img src=\"http://tsuts.tskoli.is/2t/1404002030/filemgr/download.php?dir=".$dir."&filename=".$filename."\"";
   ?>
  </body>
</html>