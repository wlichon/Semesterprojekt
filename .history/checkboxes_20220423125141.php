<?php
if (!isset($_POST["submitnamecommentcheckbox"])) {
    header('location: http://localhost/Semesterprojekt/');
}

$check_value = isset($_POST['ichtestenur']) ? 1 : 0;
echo $check_value;
