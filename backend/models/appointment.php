<?php
class Appointment {
    public $date;
    public $name;
    public $comment;

    function __construct($date,$name,$comment) {
        $this->date = $date;
        $this->name = $name;
        $this->comment = $comment;
      }
}
