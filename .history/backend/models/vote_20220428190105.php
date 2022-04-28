<?php
class Vote
{
    public $optionsnummer;
    public $voting;

    function __construct($commentid, $name, $comment)
    {
        $this->commentid = $commentid;
        $this->name = $name;
        $this->comment = $comment;
    }
}

//$a = new Appointment("22-02-1234","MEETING","2013-03-15 23:40:00","12:00","13:00",Option["2013-03-15","2013-03-15","2013-03-14"]);



//echo date_format($a->date,"c");;
