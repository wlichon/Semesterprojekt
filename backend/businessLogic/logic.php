<?php
include("db/dataHandler.php");

class Logic
{
    private $dh;
    function __construct()
    {
        $this->dh = new DataHandler();
    }

    function handleRequest($method, $param)
    {
        switch ($method) {
            case "loadAppointments":
                $res = $this->dh->loadAppointments();
                break;
            case "queryAppointments":
                $res = $this->dh->queryAppointments();
                break;
            default:
                $res = null;
                break;
        }
        return $res;
    }
}
