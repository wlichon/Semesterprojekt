<?php
class Appointment
{
  public $title;
  public $votingExpirationDate;
  public $id;

  function __construct($title, $votingExpirationDate, $id)
  {
    $this->title = $title;
    $this->votingExpirationDate = date_create($votingExpirationDate);
    $this->id = $id;
  }
}
