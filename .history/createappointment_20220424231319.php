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
$option1 = $_POST["terminoption1begin"];
$option1 = $_POST["terminoption1end"];
$option2 = $_POST["terminoption2begin"];
$option2 = $_POST["terminoption2end"];

$datahandler = new DataHandler($conn);
$datahandler->createOptions($option1, $option2, $date);
$datahandler->createAppointments($title, $votingExpirationDate, $beginTime, $endTime, $date);

header('location: http://localhost/Semesterprojekt');
