<?php
if (!isset($_POST["submitnamecommentcheckbox"])) {
    header('location: http://localhost/Semesterprojekt/');
}

$check_value = isset($_POST['checkboxnumber']) ? 1 : 0;
