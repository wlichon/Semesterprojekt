<?php

class Vote
{
    public $optionsnummer;
    public $votingCount;
    public $date;
    public $begin;
    public $end;

    function __construct($votingCount, $optionsnummer, $date, $begin, $end)
    {
        $this->votingCount = $votingCount;
        $this->optionsnummer = $optionsnummer;
        $this->date = $date;
        $this->begin = $begin;
        $this->end = $end;
    }
}
