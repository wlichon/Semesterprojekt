<?php
include("businessLogic/logic.php");
include(__DIR__ . "\db\db.php");

$param = "";
$function = "";

$function = "deleteAppointment";
$param = 2;

$testfunction = "loadCommentsAndNames";
$testid = 4;

isset($_GET["function"]) ? $function = $_GET["function"] : false;
isset($_GET["param"]) ? $param = $_GET["param"] : false;
if (isset($_GET["param1"])) {
    $date = $_GET["param1"];
    $meetingID = $_GET["param2"];
    $title = $_GET["param3"];
    $votingExpirationDate = $_GET["param4"];
    $begin = $_GET["param5"];
    $end = $_GET["param6"];
    $terminoption1begin = $_GET["param7"];
    $terminoption1end = $_GET["param8"];
    $terminoption2begin = $_GET["param9"];
    $terminoption2end = $_GET["param10"];
    $terminoption1id = $_GET["param11"];
    $terminoption2id = $_GET["param12"];
    $logic = new Logic($conn);
    $logic->insertIntoDB($function, $date, $meetingID, $title, $votingExpirationDate, $begin, $end, $terminoption1begin, $terminoption1end, $terminoption2begin, $terminoption2end, $terminoption1id, $terminoption2id);
}

if (isset($_GET["meetingnummer"])) {
    $meetingID = $_GET["meetingnummer"];
    $name = $_GET["name"];
    $comment = $_GET["kommentar"];
    $termin1 = $_GET["termin1auswahl"];
    $termin2 = $_GET["termin2auswahl"];
    $logic = new Logic($conn);
    $logic->insertIntoDB2($meetingID, $name, $comment, $termin1, $termin2);
}

//echo (json_encode($param[0]));


$logic = new Logic($conn);                               // neue Logik konstruiert, mit eben DataHandler als Unterklasse und RequestHandler
$result = $logic->handleRequest($function, $param);
$result = $logic->handleRequest($testfunction, $testid);

// führe mit der function die wir von javascript mit ajax call fordern, einen handleRequest auf (LOGIK)
// schaut dann einfach welche FUnktion wir ausführen müssen von der dataHandler Klasse

if ($result == null) {
    response("GET", 400, null);
} else {
    response("GET", 200, $result);
}

function response($function, $httpStatus, $data)
{
    header('Content-type: application/json');
    switch ($function) {
        case "GET":
            http_response_code($httpStatus);
            echo (json_encode($data));
            break;
        default:
            http_response_code(405);
            echo ("Method not supported yet!");
    }
}
