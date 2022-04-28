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
            case "deleteAppointment":
                $res = $this->dh->deleteAppointment($param);
                break;
            case "loadCommentsAndNames":
                $res = $this->dh->loadCommentsAndNames($param);
                break;
            case "getHighestVote":
                $res = $this->dh->getHighestVote($param);
                break;
            case "loadVotingCounter":
                $res = $this->dh->loadVotingCounter()
            default:
                $res = null;
                break;
        }
        return $res;
    }

    function loadComments($param)
    {
        $this->dh->loadCommentsAndNames($param);
    }

    function insertIntoDB($function, $date, $meetingID, $title, $votingExpirationDate, $begin, $end, $terminoption1begin, $terminoption1end, $terminoption2begin, $terminoption2end, $terminoption1id, $terminoption2id)
    {
        $this->dh->createAppointments($meetingID, $title, $votingExpirationDate, $begin, $end, $date);
        $this->dh->createOptions($date, $terminoption1begin, $terminoption1end, $meetingID, 0, $terminoption1id);
        $this->dh->createOptions($date, $terminoption2begin, $terminoption2end, $meetingID, 1, $terminoption2id);
    }

    function insertIntoDB2($meetingID, $name, $comment, $termin1, $termin2)
    {
        $this->dh->voteForAppointment($meetingID, $name, $comment, $termin1, $termin2);
        $this->dh->insertComment($meetingID, $name, $comment, $termin1, $termin2);
    }
}
