<?php
include("backend\models\appointment.php");
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


$appointment = new Appointment($date, $title, $votingExpirationDate, $beginTime, $endTime, [10, 20]);
echo $appointment->title;
echo $appointment->date;
echo $appointment->votingExpirationDate;
echo $appointment->endTime;
echo $appointment->beginTime;
