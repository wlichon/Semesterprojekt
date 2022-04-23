<?php
if (!isset($_POST["submitting"])) {
    header('location: http://localhost/Semesterprojekt/');
}

$checkbox1 = $_POST["checkboxnumber0"];
$checkbox1 = $_POST["checkboxnumber1"];

echo $checkbox1;
echo $checkbox;
