<?php
//include("backend\models\appointment.php");
include("backend\db\dataHandler.php");
include("backend\db\db.php");

if (!isset($_POST["submit"])) {
    header('location: http://localhost/Semesterprojekt/');
}

$date = $_POST["date"];
$title = $_POST["title"];
$votingExpirationDate = $_POST["votingExpirationDate"];
$beginTime  = $_POST["begin"];
$endTime = $_POST["end"];

$datahandler = new DataHandler($conn);
$datahandler->createAppointments($title, $votingExpirationDate, $beginTime, $endTime, $date);

header('location: http://localhost/Semesterprojekt');
