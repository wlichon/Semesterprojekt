<?php
if (!isset($_POST["submitnamecommentcheckbox"])) {
    header('location: http://localhost/Semesterprojekt/');
}


$check_value = isset($_POST['checkboxnumber0']) ? 1 : 0;
echo "Checkbox für Termin1 ist: ";
echo $check_value;
