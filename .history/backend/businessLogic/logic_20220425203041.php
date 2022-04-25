<?php
include("db/dataHandler.php");

class Logic
{
    private $dh;
    function __construct($conn)
    {
        $this->dh = new DataHandler($conn);          // erstelle neuen DataHandler (Klasse mit den ganzen Funktionen)
    }

    function handleRequest($function, $param)
    {
        switch ($function) {
            case "loadAppointments":
                $res = $this->dh->loadAppointments();
                break;
            case "queryAppointments":
                $res = $this->dh->queryAppointments();
                break;
            case "loadOptions":
                $res = $this->dh->loadOptions($param);
                break;

            default:
                $res = null;
                break;
        }
        return $res;
    }

    function insertIntoDB($function, $param1, $param2, $param3, $param4, $param5, $param6, $param7, $param8, $param8, $param9, $param10)
    {
        $res = $this->dh->;
    }
}
