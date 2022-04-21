<?php
include("./models/appointment.php");
include("./models/option.php");
class DataHandler
{
    public function queryAppointments()
    {
        $res =  $this->getDemoAppointments();       // retourniert array von DemoAppointments
        return $res;
    }

    public function queryOptions()
    {
        $res =  $this->getDemoOptions();        // retourniert array von den DemoOptions
        return $res;
    }

    public function loadAppointments()
    {
        $result = array();
        foreach ($this->queryAppointments() as $val) {          // lade einfach alle DemoAppointments
            array_push($result, $val);
        }
        return $result;
    }

    public function loadOptions($id)
    { //$id ist ein array von id's
        $result = array();
        foreach ($this->queryOptions() as $val) {           // lade die Options als variable
            if (in_array($val->id, $id))                    // falls die die id einer DemoOption im Array $id ist, dann
                array_push($result, $val);                  // push den value in das result-array
        }                                                   // somit weiß man welche DemoOptions man laden muss
        return $result;
    }

    private static function getDemoAppointments()
    {
        $demodata = [
            new Appointment("22-03-2022", "Meeting", "20-03-2022 12:00:00", "12:00", "13:00", [1, 2]),  // AppointmentKonstruktor: new Appointment ($date,$title,$votingExpirationDate,$begin,$end,$optionIDs) 
            new Appointment("23-04-2023", "Meeting2", "21-03-2023 14:30:00", "15:00", "17:00", [3, 4]),
            new Appointment("24-05-2024", "Meeting3", "22-05-2024 01:00:00", "8:00", "13:00", [1, 4]),
            new Appointment("25-06-2027", "Meeting4", "22-05-2025 19:30:00", "18:00", "18:30", [2, 3])
        ];
        return $demodata;
    }

    private static function getDemoOptions()
    {
        $demodata = [
            new Option("2022-03-15", 1, "12:00", "13:00"), // OptionKonstruktor: new Option($date,$id,$begin,$end)
            new Option("2022-04-11", 2, "15:00", "16:00"),
            new Option("2022-03-25", 3, "11:20", "12:00"),
            new Option("2022-05-15", 4, "8:00", "19:30")
        ];
        return $demodata;
    }
}

//$test = new DataHandler;


//$id = array(1,2);

//$test->loadOptions($id);


//print_r($id);
