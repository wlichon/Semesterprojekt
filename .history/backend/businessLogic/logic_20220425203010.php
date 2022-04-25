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
        function createAppointments($meetingID, $title, $votingExpirationDate, $begin, $end, $date)
        {
            $sql = "INSERT INTO Appointment (a_id, title, votingExpirationDate, begin, end, date) VALUES (?, ?, ?, ?, ?, ?);";
            $statement = $this->conn->prepare($sql);
            $statement->bind_param("isssss", $meetingID, $title, $votingExpirationDate, $begin, $end, $date);
            $statement->execute();
        }

        function createOptions($optionbegin, $optionend, $meetingID)
        {
            $sql = "INSERT INTO Options (begin, end, fk_a_id) VALUES (?, ?, ?);";
            $statement = $this->conn->prepare($sql);
            $statement->bind_param("ssi", $optionbegin, $optionend, $meetingID);
            $statement->execute();
        }
    }
}
