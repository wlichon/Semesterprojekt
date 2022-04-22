<?php
include("backend\models\appointment.php");
isset($_POST["submit"]) ?: header('Location: http://www.example.com/');
$date = $_POST["date"];
$title = $_POST["title"];
$votingExpirationDate = $_POST["votingExpirationDate"];
$beginTime  = $_POST["begin"];
$endTime = $_POST["end"];

echo $title;
echo $date;
echo $votingExpirationDate;
echo $endTime;
echo $beginTime;

// store in database
$appointment = new Appointment($date, $title, $votingExpirationDate, $beginTime, $endTime, [10, 20]);
