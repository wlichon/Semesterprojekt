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

// store in database
// über den serviceHandler neue Funktion erstellen die alles in die Datenbank schickt
$appointment = new Appointment($date, $title, $votingExpirationDate, $beginTime, $endTime, [10, 20]);
