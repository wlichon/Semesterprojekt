<?php
include(__dir__ . "\..\models\optionvote.php");
include(__dir__ . "\..\models\appointment.php");
include(__dir__ . "\..\models\option.php");
include(__dir__ . "\..\models\comment.php");


class DataHandler
{
    public $conn;

    function __construct($conn)
    {
        $this->conn = $conn;
    }


    public function queryAppointments()
    {
        $sql = "SELECT * FROM Appointment;";
        $result = $this->conn->query($sql);
        if ($result->num_rows > 0) {
            $array = $result->fetch_all();
            $data = array();
            $iterator = 0;
            foreach ($array as $item) {
                $data[$iterator] = new Appointment($item[5], $item[1], $item[2], $item[3], $item[4], $item[0]);
                // echo $item[2], $item[1], $item[5], $item[3], $item[4], $item[0];
                //new Appointment("22-03-2022", "Meeting", "20-03-2022 12:00:00", "12:00", "13:00", [1, 2]),
                //$date,$title,$votingExpirationDate,$begin,$end,$optionIDs
                //item[2] == date // item [5] == votingexpir
                $iterator++;
            }
        }
        return $data;
    }

    public function queryOptions($id)
    {
        $sql = "SELECT * FROM Options WHERE fk_a_id=?;";
        $statement = $this->conn->prepare($sql);
        $statement->bind_param("i", $id);
        $statement->execute();
        $result = $statement->get_result();



        if ($result->num_rows > 0) {
            $array = $result->fetch_all();
            $data = array();
            $iterator = 0;
            foreach ($array as $item) {
                $data[$iterator] = new Option($item[2], $item[0], $item[3], $item[4]);
                //new Appointment("22-03-2022", "Meeting", "20-03-2022 12:00:00", "12:00", "13:00", [1, 2]),
                //new Option($date,$id,$begin,$end)
                $iterator++;
            }
        }
        return $data;
    }



    public function loadAppointments()
    {
        $result = array();
        foreach ($this->queryAppointments() as $val) {          // lade einfach alle DemoAppointments
            array_push($result, $val);
        }
        //print_r($result);
        return $result;
    }



    function createAppointments($meetingID, $title, $votingExpirationDate, $begin, $end, $date)
    {
        $sql = "INSERT INTO Appointment (a_id, title, votingExpirationDate, begin, end, date) VALUES (?, ?, ?, ?, ?, ?);";
        $statement = $this->conn->prepare($sql);
        $statement->bind_param("isssss", $meetingID, $title, $votingExpirationDate, $begin, $end, $date);
        $statement->execute();
    }


    function createOptions($date, $optionbegin, $optionend, $meetingID, $optionsnummer, $optionID)
    {
        $sql = "INSERT INTO Options (begin, end, fk_a_id, date, optionsnummer, o_id) VALUES (?, ?, ?, ?, ?, ?);";
        $statement = $this->conn->prepare($sql);
        $statement->bind_param("ssisii", $optionbegin, $optionend, $meetingID, $date, $optionsnummer, $optionID);
        $statement->execute();
    }



    function voteForAppointment($meetingID, $name, $comment, $termin1, $termin2)
    {
        $eins = 1;
        $null = 0;

        if ($termin1 == 1) {
            $sql = "UPDATE Options SET voteCount = voteCount + 1 WHERE fk_a_id=? and optionsnummer=?;";
            $statement = $this->conn->prepare($sql);
            $statement->bind_param("ii", $meetingID, $null);
            $statement->execute();
        }
        if ($termin2 == 1) {
            $sql = "UPDATE Options SET voteCount = voteCount + 1 WHERE fk_a_id=? and optionsnummer=?;";
            $statement = $this->conn->prepare($sql);
            $statement->bind_param("ii", $meetingID, $eins);
            $statement->execute();
        }
    }


    function insertComment($meetingID, $name, $comment, $termin1, $termin2)
    {

        if ($termin1 == 1 || $termin2 == 1) {
            $sql = "INSERT INTO kommentare (personname, comment, fk_a_id) VALUES (?,?,?);";
            $statement = $this->conn->prepare($sql);
            $statement->bind_param("ssi", $name, $comment, $meetingID); //<-- muss daher
            $statement->execute();
        }
    }

    function getHighestVote($appointmentID)
    {
        $sql = "SELECT begin FROM options WHERE fk_a_id = $appointmentID and (fk_a_id,voteCount) IN 
        ( SELECT fk_a_id, MAX(voteCount)
          FROM options
          GROUP BY fk_a_id
        )";
        $result = $this->conn->query($sql);
        if ($result->num_rows > 0) {
            $res = $result->fetch_all();
        }
        return $res[0];
    }


    function loadCommentsAndNames($id)
    {
        $sql = "SELECT * FROM kommentare where fk_a_id=$id";
        $res = $this->conn->query($sql);
        if ($res->num_rows > 0) {
            $array = $res->fetch_all();
            $data = array();
            $iterator = 0;
            foreach ($array as $item) {
                $data[$iterator] = new Comment($item[0], $item[1], $item[2]);
                $iterator++;
            }
        }
        return $data;
    }


    function deleteAppointment($id)
    {
        $sql = "DELETE FROM Appointment WHERE a_id=$id";
        $res = $this->conn->query($sql);
        return $res;
    }




    public function loadOptions($id)
    { //$id ist ein array von id's
        $result = array();
        foreach ($this->queryOptions($id) as $val) {           // lade die Options als variable
            // falls die die id einer DemoOption im Array $id ist, dann
            array_push($result, $val);                  // push den value in das result-array
        }                                                   // somit weiß man welche DemoOptions man laden muss
        return $result;
    }


    public function loadVotingCounter($id)
    {
        $sql = "SELECT * FROM options where fk_a_id=$id";
        $res = $this->conn->query($sql);
        if ($res->num_rows > 0) {
            $array = $res->fetch_all();
            $data = array();
            $iterator = 0;
            foreach ($array as $item) {
                $data[$iterator] = new Vote($item[0], $item{});
                $iterator++;
            }
        }
        return $data;
    }
}
/*

include("db.php");

$test = new DataHandler($conn);
$test->loadAppointments();
$test->loadOptions(1);


echo "over";
*/




//$array = $test->queryAppointments();

//$first = $array[1];

//echo date_format($first->date,"c");


//$id = array(1,2);

//$test->loadOptions($id);


//print_r($id);
