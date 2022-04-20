<?php
class Appointment {
    public $title;
    public $votingExpirationDate;
    public $begin;
    public $end;
    public $date;
    public $optionIDs;

    function __construct($date,$title,$votingExpirationDate,$begin,$end,$optionIDs) {
        $this->date = date_create($date);
        $this->title = $title;
        $this->votingExpirationDate = date_create($votingExpirationDate);
        $this->begin = date_create($begin);
        $this->end = date_create($end);
        $this->optionIDs = $optionIDs;
      }
}

//$a = new Appointment("22-02-1234","MEETING","2013-03-15 23:40:00","12:00","13:00",Option["2013-03-15","2013-03-15","2013-03-14"]);



//echo date_format($a->date,"c");;
