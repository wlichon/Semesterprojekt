<?php

//include("date.php");

class Option {
    public $voteCount;
    public $date;
    public $id;
    public $begin;
    public $end;

    function __construct($date,$id,$begin,$end) {
        $this->date = date_create($date);
        $this->voteCount = 0;
        $this->id = $id;
        $this->begin = date_create($begin);
        $this->end = date_create($end);

      }
}

//echo date_format($d->date,"Y-m-d");

//$a = new Option("23","02","1999","Meeting");

//echo date_format($a->date,"M");