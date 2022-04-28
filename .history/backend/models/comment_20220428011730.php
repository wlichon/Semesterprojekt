<?php
class Comment
{
    public $title;
    public $votingExpirationDate;
    public $begin;

    function __construct($date, $title, $votingExpirationDate, $begin, $end, $id)
    {
        $this->date = date_create($date);
        $this->title = $title;
        $this->votingExpirationDate = date_create($votingExpirationDate);
        $this->begin = date_create($begin);
        $this->end = date_create($end);
        $this->id = $id;
    }
}

//$a = new Appointment("22-02-1234","MEETING","2013-03-15 23:40:00","12:00","13:00",Option["2013-03-15","2013-03-15","2013-03-14"]);



//echo date_format($a->date,"c");;
