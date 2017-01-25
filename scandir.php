<?php
  $drive = $_POST["drive"];
  $files = scandir($drive.$_POST["dir"]);
  $jsonFiles = array();
  for ($i = 0; $i < count($files); $i++)
  {
     array_push($jsonFiles, $files[$i]);
  }
  die(json_encode($jsonFiles));
?>