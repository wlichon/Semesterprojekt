<?php
include(__dir__."\..\models\appointment.php");
include(__dir__."\..\models\option.php");
class DataHandler
{
    public $conn;

    function __construct($conn) {
        $this->conn = $conn;
       
      }


    public function queryAppointments(){
        $sql = "SELECT * FROM Appointment;";
        $result = $this->conn->query($sql);
        if ($result->num_rows > 0) {
            $array = $result->fetch_all();
            $data = array();
            $iterator = 0;
            foreach ($array as $item){
                $data[$iterator] = new Appointment($item[2],$item[1],$item[5],$item[3],$item[4],$item[0]);
                //new Appointment("22-03-2022", "Meeting", "20-03-2022 12:00:00", "12:00", "13:00", [1, 2]),
                //$date,$title,$votingExpirationDate,$begin,$end,$optionIDs
                $iterator++;
            }
             
          }
          return $data;
    }

    public function queryOptions($id){
        $sql = "SELECT * FROM Options WHERE fk_a_id=?;";
        $statement = $this->conn->prepare($sql);
        $statement->bind_param("i",$id);
        $statement->execute();
        $result = $statement->get_result();

        

        if ($result->num_rows > 0) {
            $array = $result->fetch_all();
            $data = array();
            $iterator = 0;
            foreach ($array as $item){
                $data[$iterator] = new Option($item[2],$item[0],$item[3],$item[4]);
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

    public function loadOptions($id)
    { //$id ist ein array von id's
        $result = array();
        foreach ($this->queryOptions($id) as $val) {           // lade die Options als variable
                                                            // falls die die id einer DemoOption im Array $id ist, dann
            array_push($result, $val);                  // push den value in das result-array
        }                                                   // somit weiß man welche DemoOptions man laden muss
        return $result;
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
