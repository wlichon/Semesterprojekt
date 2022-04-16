<?php
class Appointment {
    public $day;
    public $month;
    public $time;
    public $name;
    public $comment;

    function __construct($day,$month,$time,$name,$comment) {
        $this->day = $day;
        $this->month = $month;
        $this->time = $time;
        $this->name = $name;
        $this->comment = $comment;
      }
}
