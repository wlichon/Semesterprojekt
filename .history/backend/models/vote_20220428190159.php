<?php
class Vote
{
    public $optionsnummer;
    public $votingCount;

    function __construct($votingCount, $optionsnummer)
    {
        $this->votingCount = $votingCount;
        $this->optionsnummer = $optionsnummer;
    }
}