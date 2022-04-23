<?php
if (!isset($_POST["submitnamecommentcheckbox"])) {
    header('location: http://localhost/Semesterprojekt/');
}


$check_value = isset($_POST['checkboxnumber0']) ? 1 : 0;
echo "Checkbox für Termin 2 ist: ";
echo $check_value;

$check_value2 = isset($_POST['checkboxnumber1']) ? 1 : 0;
echo "Checkbox für Termin 2 ist: ";
echo $check_value;
