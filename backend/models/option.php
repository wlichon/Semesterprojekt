<?php

//include("date.php");

class Option {
    public $voteCount;
    public $date;
    public $timerange;

    function __construct($day,$month,$year) {
        $this->date = date_create($year."-".$month."-".$day);
        $this->voteCount = 0;

      }
}

//echo date_format($d->date,"Y-m-d");

//$a = new Option("23","02","1999","Meeting");

//echo date_format($a->date,"Y-m-d");