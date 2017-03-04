<?php
  $drive = $_POST["drive"];
  $files = array_map("utf8_encode", scandir($drive.$_POST["dir"]));
  die(json_encode($files));
?>