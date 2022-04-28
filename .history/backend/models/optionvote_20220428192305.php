<?php

class Vote
{
    public $optionsnummer;
    public $votingCount;
    public $date;

    function __construct($votingCount, $optionsnummer, $date)
    {
        $this->votingCount = $votingCount;
        $this->optionsnummer = $optionsnummer;
        $this->date = $date;
    }
}
