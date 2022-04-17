<?php
class AppointmentOption {
    public $name;
    public $comment;

    function __construct($name,$comment) {
        $this->name = $name;
        $this->comment = $comment;
      }
}