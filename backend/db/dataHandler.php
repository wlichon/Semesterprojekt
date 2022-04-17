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

    private static function getDemoData()
    {
        $demodata = [
            new Appointment("22","03","2022","Meeting","20-03-2022 12:00:00","12:00","13:00"),
            new Appointment("23","04","2023","Meeting2","21-03-2023 14:30:00","15:00","17:00"),
            new Appointment("24","05","2024","Meeting3","22-05-2024 01:00:00","8:00","13:00"),
            new Appointment("25","06","2025","Meeting4","22-05-2025 19:30:00","18:00","18:30")
        ];
        return $demodata;
    }
}
