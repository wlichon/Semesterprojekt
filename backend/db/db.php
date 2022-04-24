<?php
$servername = "localhost";
$username = "bif2webscriptinguser";
$password = "bif2021";
$dbName = "AppointmentFinder";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbName);

// Check connection
if ($conn->connect_error) {
  die($conn->connect_error);
}
//echo "Connected successfully";
?>