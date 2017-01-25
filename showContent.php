<!doctype html>
<html>
  <head>
  </head>
  <body>
  <pre>
<?php
       $location = $_GET["dir"];
       echo  htmlspecialchars(file_get_contents( $location ));
    ?>
</pre>
  </body>
</html>