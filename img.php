<!-- This program is free software. It comes without any warranty, to
     * the extent permitted by applicable law. You can redistribute it
     * and/or modify it under the terms of the Do What The Fuck You Want
     * To Public License, Version 2, as published by Sam Hocevar. See
     * http://www.wtfpl.net/ for more details. -->
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