<?php
include("./models/appointment.php");
class DataHandler
{
    public function queryAppointments()
    {
        $res =  $this->getDemoData();
        return $res;
    }

    public function loadAppointments()
    {
        $result = array();
        foreach ($this->queryAppointments() as $val) {
             array_push($result, $val);
          }
        return $result;
    }

    public function queryPersonById($id)
    {
        $result = array();
        foreach ($this->queryAppointments() as $val) {
            if ($val[0]->id == $id) {
                array_push($result, $val);
            }
        }
        return $result;
    }

    public function queryPersonByName($name)
    {
        $result = array();
        foreach ($this->queryAppointments() as $val) {
            if ($val[0]->lastname == $name) {
                array_push($result, $val);
            }
        }
        return $result;
    }

    private static function getDemoData()
    {
        $demodata = [
            [new Appointment("22","03","2022","Meeting")],
            [new Appointment("23","04","2023","Meeting2")],
            [new Appointment("24","05","2024","Meeting3")],
            [new Appointment("25","06","2025","Meeting4")]
        ];
        return $demodata;
    }
}
