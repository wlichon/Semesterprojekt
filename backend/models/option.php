<?php

//include("date.php");

class Option {
    public $voteCount;
    public $date;
    public $timerange;
    public $id;

    function __construct($date,$id) {
        $this->date = date_create($date);
        $this->voteCount = 0;
        $this->id = $id;

      }
}

//echo date_format($d->date,"Y-m-d");

//$a = new Option("23","02","1999","Meeting");

//echo date_format($a->date,"M");