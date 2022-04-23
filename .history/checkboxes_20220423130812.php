<?php
if (!isset($_POST["submitnamecommentcheckbox"])) {
    header('location: http://localhost/Semesterprojekt/');
}


$check_value = isset($_POST['2']) ? 1 : 0;
echo "Checkbox für Termin 1 ist: ", $check_value, "\n";

$check_value2 = isset($_POST['1']) ? 1 : 0;
echo "\nCheckbox für Termin 2 ist: ", $check_value2;
