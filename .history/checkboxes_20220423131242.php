<?php
if (!isset($_POST["submitnamecommentcheckbox"])) {
    header('location: http://localhost/Semesterprojekt/');
}


if (!empty($_POST['check_list'])) {
    foreach ($_POST['check_list'] as $check) {
        echo $check; //echoes the value set in the HTML form for each checked checkbox.
        //so, if I were to check 1, 3, and 5 it would echo value 1, value 3, value 5.
        //in your case, it would echo whatever $row['Report ID'] is equivalent to.
    }
}
/*
$check_value = isset($_POST['1']) ? 1 : 0;
echo "Checkbox für Termin 1 ist: ", $check_value, "\n";

$check_value2 = isset($_POST['2']) ? 1 : 0;
echo "\nCheckbox für Termin 2 ist: ", $check_value2;
*/