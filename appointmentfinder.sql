-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 24. Apr 2022 um 15:57
-- Server-Version: 10.4.21-MariaDB
-- PHP-Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `appointmentfinder`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `appointment`
--

CREATE TABLE `appointment` (
  `a_id` int(10) NOT NULL,
  `title` text NOT NULL,
  `votingExpirationDate` datetime NOT NULL,
  `begin` datetime NOT NULL,
  `end` datetime NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `appointment`
--

INSERT INTO `appointment` (`a_id`, `title`, `votingExpirationDate`, `begin`, `end`, `date`) VALUES
(1, 'Meeting', '2022-04-26 11:30:00', '2022-04-27 15:30:00', '2022-04-27 18:30:30', '2022-04-27 11:30:30'),
(2, 'Meeting2', '2022-04-26 14:00:00', '2022-04-27 09:00:00', '2022-04-27 13:30:00', '2022-04-27 11:32:39'),
(3, 'Meeting3', '2022-03-24 15:50:37', '2022-03-24 08:00:00', '2022-03-24 10:50:00', '2022-03-24 15:50:37'),
(4, 'Meeting4', '2022-07-23 15:30:00', '2022-07-25 09:50:00', '2022-07-27 15:50:00', '2022-07-27 15:50:37');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `options`
--

CREATE TABLE `options` (
  `o_id` int(10) NOT NULL,
  `voteCount` int(10) NOT NULL,
  `date` datetime NOT NULL,
  `begin` datetime NOT NULL,
  `end` datetime NOT NULL,
  `fk_a_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `options`
--

INSERT INTO `options` (`o_id`, `voteCount`, `date`, `begin`, `end`, `fk_a_id`) VALUES
(1, 0, '2022-04-27 12:04:18', '2022-04-27 12:04:18', '2022-04-27 18:04:18', 1),
(2, 0, '2022-04-24 14:50:19', '2022-04-24 12:50:19', '2022-04-24 19:19:00', 1),
(3, 0, '2022-05-25 15:26:03', '2022-05-25 08:30:00', '2022-05-24 15:00:00', 2),
(4, 0, '2022-03-24 15:26:03', '2022-03-24 15:00:00', '2022-04-24 20:00:00', 1);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`a_id`);

--
-- Indizes für die Tabelle `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`o_id`),
  ADD KEY `fk_a_id` (`fk_a_id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `appointment`
--
ALTER TABLE `appointment`
  MODIFY `a_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT für Tabelle `options`
--
ALTER TABLE `options`
  MODIFY `o_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `options`
--
ALTER TABLE `options`
  ADD CONSTRAINT `fk_a_id` FOREIGN KEY (`fk_a_id`) REFERENCES `appointment` (`a_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
