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

    function insertIntoDB($function, $date, $meetingID, $title, $votingExpirationDate, $begin, $end, $terminoption1begin, $terminoption1end, $terminoption2begin, $terminoption2end, $terminoption1id, $terminoption2id)
    {
        $this->dh->createAppointments($meetingID, $title, $votingExpirationDate, $begin, $end, $date);
        $this->dh->createOptions($param1, $param7, $param8, $param2, 0, $param11);
        $this->dh->createOptions($param1, $param9, $param10, $param2, 1, $param12);
    }

    function insertIntoDB2($meetingID, $name, $comment, $termin1, $termin2, $optionID)
    {
        $this->dh->voteForAppointment($meetingID, $name, $comment, $termin1, $termin2, $optionID);
        $this->dh->insertComment($meetingID, $name, $comment, $optionID);
    }
}
