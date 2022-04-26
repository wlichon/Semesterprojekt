<?php
include("businessLogic/logic.php");
include(__DIR__ . "\db\db.php");

$param = "";
$function = "";

isset($_GET["function"]) ? $function = $_GET["function"] : false;
isset($_GET["param"]) ? $param = $_GET["param"] : false;
if (isset($_GET["param1"])) {
    $param1 = $_GET["param1"];
    $param2 = $_GET["param2"];
    $param3 = $_GET["param3"];
    $param4 = $_GET["param4"];
    $param5 = $_GET["param5"];
    $param6 = $_GET["param6"];
    $param7 = $_GET["param7"];
    $param8 = $_GET["param8"];
    $param9 = $_GET["param9"];
    $param10 = $_GET["param10"];
    $logic = new Logic($conn);
    $logic->insertIntoDB($function, $param1, $param2, $param3, $param4, $param5, $param6, $param7, $param8, $param8, $param9, $param10);
}

if (isset($_GET[""]))

    //echo (json_encode($param[0]));


    $logic = new Logic($conn);                               // neue Logik konstruiert, mit eben DataHandler als Unterklasse und RequestHandler
$result = $logic->handleRequest($function, $param);

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
