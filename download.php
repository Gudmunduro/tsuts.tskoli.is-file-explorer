<?php
  if (!isset($_GET["filename"]))
  {
     die("Downlaod Failed!");
  }
  $fileName = $_GET["filename"];
  $fileDir = $_GET["dir"];
  header("Content-type: application/others");
  header("Content-disposition: attachment;filename=$fileName");
  readfile($fileDir);
?>