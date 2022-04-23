<?php
if (!isset($_POST["submitnamecommentcheckbox"])) {
    header('location: http://localhost/Semesterprojekt/');
}

$check_value = isset($_POST['my_checkbox_name']) ? 1 : 0;
