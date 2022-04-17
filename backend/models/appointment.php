<?php
class Appointment {
    public $title;

    function __construct($day,$month,$year,$title) {
        $this->date = date_create($year."-".$month."-".$day);
        $this->title = $title;
      }
}
