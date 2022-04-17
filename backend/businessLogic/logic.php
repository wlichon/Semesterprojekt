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
            case "queryPersonById":
                $res = $this->dh->queryPersonById($param);
                break;
            case "queryPersonByName":
                $res = $this->dh->queryPersonByName($param);
                break;
            default:
                $res = null;
                break;
        }
        return $res;
    }
}
