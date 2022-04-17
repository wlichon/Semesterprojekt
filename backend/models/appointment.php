<?php
class Appointment {
    public $title;
    public $votingExpirationDate;
    public $begin;
    public $end;

    function __construct($day,$month,$year,$title,$votingExpirationDate,$begin,$end) {
        $this->date = date_create($year."-".$month."-".$day);
        $this->title = $title;
        $this->votingExpirationDate = date_create($votingExpirationDate);
        $this->begin = date_create($begin);
        $this->end = date_create($end);
      }
}

//$a = new Appointment("22","03","1234","MEETING","2013-03-15 23:40:00","12:00","13:00");

//echo date_format($a->end,"c");;
