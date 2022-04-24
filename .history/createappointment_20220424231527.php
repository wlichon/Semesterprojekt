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
$option1begin = $_POST["terminoption1begin"];
$option1end = $_POST["terminoption1end"];
$option2begin = $_POST["terminoption2begin"];
$option2end = $_POST["terminoption2end"];

$datahandler = new DataHandler($conn);
$datahandler->createOptions($option1begin, $option1end, $option2begin, $option2end);
$datahandler->createAppointments($title, $votingExpirationDate, $beginTime, $endTime, $date);

header('location: http://localhost/Semesterprojekt');
