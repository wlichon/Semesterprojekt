<?php

class Date{
    public $date;

    function __construct($day,$month,$year) {
        $this->date = date_create($year."-".$month."-".$day);
       
      }
}

//$d = new Date("23","02","1999");

//echo date_format($d->date,"Y-m-d");
