<?php
if (!isset($_POST["submitnamecommentcheckbox"])) {
    header('location: http://localhost/Semesterprojekt/');
}

$check_value = isset($_POST['ichtestenur']) ? 1 : 0;
if ($check_value) {
    echo $_POST['ichtestenur'];
}
