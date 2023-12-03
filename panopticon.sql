-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 34.41.96.81
-- Generation Time: Dec 02, 2023 at 07:12 PM
-- Server version: 8.0.31-google
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `panopticon`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`ericxusu`@`%` PROCEDURE `pof_search_proc` (IN `input_first` VARCHAR(255), IN `input_first_search_type` VARCHAR(10), IN `input_last` VARCHAR(255), IN `input_last_search_type` VARCHAR(10), IN `input_status` VARCHAR(255))   BEGIN
    SELECT first AS 'Probation Officer First Name', last AS 'Probation Officer Last Name', status
        FROM prob_officer
    WHERE (first LIKE 
           CASE 
               WHEN input_first_search_type = 'starts' THEN CONCAT(input_first, '%')
               WHEN input_first_search_type = 'contains' THEN CONCAT('%', input_first, '%')
               ELSE input_first
           END OR input_first IS NULL)
    AND (last LIKE 
         CASE 
             WHEN input_last_search_type = 'starts' THEN CONCAT(input_last, '%')
             WHEN input_last_search_type = 'contains' THEN CONCAT('%', input_last, '%')
             ELSE input_last
         END OR input_last IS NULL)
    AND (status LIKE input_status OR input_status IS NULL);
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `alias`
--

CREATE TABLE `alias` (
  `alias_id` decimal(6,0) DEFAULT NULL,
  `criminal_id` decimal(6,0) DEFAULT NULL,
  `alias` varchar(20) NOT NULL DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `alias`
--

INSERT INTO `alias` (`alias_id`, `criminal_id`, `alias`) VALUES
(8, 7, 'David Wilson'),
(3, 2, 'Emily Johnson'),
(2, 1, 'Jay Smith'),
(9, 8, 'Jess Taylor'),
(1, 1, 'John Doe'),
(7, 6, 'Lisa Miller'),
(10, 10, 'Megan Brown'),
(4, 3, 'Mike Williams'),
(6, 5, 'Rob Davis'),
(5, 4, 'Sara Jones');

-- --------------------------------------------------------

--
-- Table structure for table `appeals`
--

CREATE TABLE `appeals` (
  `appeal_id` decimal(5,0) NOT NULL,
  `crime_id` decimal(9,0) DEFAULT NULL,
  `filing_date` date DEFAULT NULL,
  `hearing_date` date DEFAULT NULL,
  `status` char(1) DEFAULT 'P'
) ;

--
-- Dumping data for table `appeals`
--

INSERT INTO `appeals` (`appeal_id`, `crime_id`, `filing_date`, `hearing_date`, `status`) VALUES
(1, 1, '2022-04-05', '2022-04-25', 'P'),
(2, 2, '2022-05-10', '2022-05-30', 'P'),
(4, 4, '2022-07-20', '2022-08-10', 'A'),
(5, 5, '2022-08-25', '2022-09-15', 'A'),
(7, 7, '2022-10-05', '2022-10-25', 'D'),
(4295, 8, '2022-07-09', '2022-08-19', 'D'),
(18938, 8, '2022-04-25', '2022-04-25', 'P');

-- --------------------------------------------------------

--
-- Table structure for table `crimes`
--

CREATE TABLE `crimes` (
  `crime_id` decimal(9,0) NOT NULL,
  `criminal_id` decimal(6,0) DEFAULT NULL,
  `classification` char(1) DEFAULT 'U',
  `date_charged` date DEFAULT NULL,
  `status` char(2) NOT NULL,
  `hearing_date` date DEFAULT NULL,
  `appeal_cut_date` date DEFAULT NULL
) ;

--
-- Dumping data for table `crimes`
--

INSERT INTO `crimes` (`crime_id`, `criminal_id`, `classification`, `date_charged`, `status`, `hearing_date`, `appeal_cut_date`) VALUES
(1, 1, 'F', '2022-01-15', 'CL', '2022-03-20', '2022-03-10'),
(2, 2, 'O', '2022-02-08', 'CA', '2022-04-15', '2022-04-05'),
(3, 3, 'F', '2022-03-20', 'IA', '2022-05-25', '2022-05-15'),
(4, 4, 'F', '2022-04-05', 'CL', '2022-06-10', '2022-06-05'),
(5, 5, 'U', '2022-05-12', 'CL', '2022-07-15', '2022-07-05'),
(7, 7, 'M', '2022-07-10', 'IA', '2022-09-15', '2022-09-05'),
(8, 8, 'O', '2022-08-15', 'CL', '2022-10-20', '2022-10-10'),
(9, 9, 'U', '2022-09-10', 'IA', '2022-11-15', '2022-11-05');

-- --------------------------------------------------------

--
-- Table structure for table `crime_charges`
--

CREATE TABLE `crime_charges` (
  `charge_id` decimal(10,0) NOT NULL,
  `crime_id` decimal(9,0) DEFAULT NULL,
  `crime_code` decimal(3,0) DEFAULT NULL,
  `charge_status` char(2) DEFAULT NULL,
  `fine_amount` decimal(7,2) DEFAULT NULL,
  `court_fee` decimal(7,2) DEFAULT NULL,
  `amount_paid` decimal(7,2) DEFAULT NULL,
  `payment_due_date` date DEFAULT NULL
) ;

--
-- Dumping data for table `crime_charges`
--

INSERT INTO `crime_charges` (`charge_id`, `crime_id`, `crime_code`, `charge_status`, `fine_amount`, `court_fee`, `amount_paid`, `payment_due_date`) VALUES
(1, 1, 101, 'PD', 500.00, 50.00, 550.00, '2022-04-01'),
(2, 2, 102, 'PD', 300.00, 30.00, 330.00, '2022-05-01'),
(4, 4, 104, 'GL', 200.00, 20.00, 220.00, '2022-07-01'),
(5, 5, 102, 'NG', 700.00, 70.00, 770.00, '2022-08-01'),
(209758782, 2, 109, 'GL', 450.00, 45.00, 495.00, '2023-02-01'),
(881925781, 4, 108, 'NG', 24.00, 56.00, 23.00, '2023-11-26'),
(3263573285, 2, 110, 'GL', 450.00, 45.00, 495.00, '2023-02-01'),
(7157180300, 2, 110, 'GL', 450.00, 45.00, 495.00, '2023-02-01');

-- --------------------------------------------------------

--
-- Table structure for table `crime_codes`
--

CREATE TABLE `crime_codes` (
  `crime_code` decimal(3,0) NOT NULL,
  `code_description` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `crime_codes`
--

INSERT INTO `crime_codes` (`crime_code`, `code_description`) VALUES
(102, 'Assault'),
(103, 'Burglary'),
(104, 'Drug Possession'),
(108, 'DUI'),
(107, 'Fraud'),
(109, 'Homicide'),
(110, 'Kidnapping'),
(105, 'Robbery'),
(101, 'Theft'),
(106, 'Vandalism');

-- --------------------------------------------------------

--
-- Table structure for table `crime_officers`
--

CREATE TABLE `crime_officers` (
  `crime_id` decimal(8,0) NOT NULL,
  `officer_id` decimal(9,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `crime_officers`
--

INSERT INTO `crime_officers` (`crime_id`, `officer_id`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(7, 7),
(8, 8);

-- --------------------------------------------------------

--
-- Table structure for table `criminals`
--

CREATE TABLE `criminals` (
  `criminal_id` decimal(6,0) NOT NULL,
  `last` varchar(15) DEFAULT NULL,
  `first` varchar(10) DEFAULT NULL,
  `street` varchar(30) DEFAULT NULL,
  `city` varchar(20) DEFAULT NULL,
  `state` char(2) DEFAULT NULL,
  `zip` char(5) DEFAULT NULL,
  `phone` char(10) DEFAULT NULL,
  `v_status` char(1) DEFAULT 'N',
  `p_status` char(1) DEFAULT 'N'
) ;

--
-- Dumping data for table `criminals`
--

INSERT INTO `criminals` (`criminal_id`, `last`, `first`, `street`, `city`, `state`, `zip`, `phone`, `v_status`, `p_status`) VALUES
(1, 'Smith', 'John', '123 Main St', 'Anytown', 'CA', '12345', '5555555555', 'N', 'N'),
(2, 'Johnson', 'Emily', '456 Elm St', 'Smallville', 'NY', '54321', '4444444444', 'Y', 'N'),
(3, 'Williams', 'Michael', '789 Oak St', 'Another City', 'TX', '67890', '3333333333', 'N', 'Y'),
(4, 'Jones', 'Sarah', '101 Pine St', 'Bigtown', 'FL', '11111', '2222222222', 'Y', 'Y'),
(5, 'Davis', 'Robert', '202 Maple St', 'Villageton', 'WA', '22222', '7777777777', 'N', 'N'),
(6, 'Miller', 'Lisa', '303 Birch St', 'Hometown', 'OR', '33333', '8888888888', 'N', 'N'),
(7, 'Wilson', 'David', '404 Cedar St', 'Townsville', 'AZ', '44444', '6666666666', 'Y', 'N'),
(8, 'Taylor', 'Jessica', '505 Fir St', 'Suburbia', 'NV', '55555', '9999999999', 'N', 'Y'),
(9, 'Anderson', 'Richard', '606 Redwood St', 'Metroville', 'CO', '66666', '1111111111', 'Y', 'Y'),
(10, 'Brown', 'Megan', '707 Spruce St', 'Downtown', 'UT', '77777', '1234567890', 'N', 'N');

-- --------------------------------------------------------

--
-- Table structure for table `officers`
--

CREATE TABLE `officers` (
  `officer_id` decimal(8,0) NOT NULL,
  `last` varchar(15) DEFAULT NULL,
  `first` varchar(10) DEFAULT NULL,
  `precinct` char(4) NOT NULL,
  `badge` varchar(14) DEFAULT NULL,
  `phone` char(10) DEFAULT NULL,
  `status` char(1) DEFAULT 'A'
) ;

--
-- Dumping data for table `officers`
--

INSERT INTO `officers` (`officer_id`, `last`, `first`, `precinct`, `badge`, `phone`, `status`) VALUES
(1, 'Smith', 'John', 'P001', 'B0001', '5555555555', 'A'),
(2, 'Johnson', 'Emily', 'P002', 'B0002', '4444444444', 'A'),
(3, 'Williams', 'Michael', 'P003', 'B0003', '3333333333', 'I'),
(4, 'Jones', 'Sarah', 'P004', 'B0004', '2222222222', 'I'),
(5, 'Davis', 'Robert', 'P005', 'B0005', '7777777777', 'I'),
(6, 'Miller', 'Lisa', 'P006', 'B0006', '8888888888', 'A'),
(7, 'Wilson', 'David', 'P007', 'B0007', '6666666666', 'A'),
(8, 'Taylor', 'Jessica', 'P008', 'B0008', '9999999999', 'I'),
(10, 'Brown', 'Megan', 'P010', 'B0010', '1234567890', 'A'),
(24832041, 'Doe', 'Jane', 'P013', 'B0015', '9876543210', 'A'),
(52878981, 'Doe', 'Jane', 'P011', 'B0011', '9876543210', 'A'),
(56397011, 'Doe', 'Jane', 'P011', 'B0012', '9876543210', 'A');

-- --------------------------------------------------------

--
-- Table structure for table `prob_officer`
--

CREATE TABLE `prob_officer` (
  `prob_id` decimal(5,0) NOT NULL,
  `last` varchar(15) DEFAULT NULL,
  `first` varchar(10) DEFAULT NULL,
  `street` varchar(30) DEFAULT NULL,
  `city` varchar(20) DEFAULT NULL,
  `state` char(2) DEFAULT NULL,
  `zip` char(5) DEFAULT NULL,
  `phone` char(10) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `status` char(1) NOT NULL
) ;

--
-- Dumping data for table `prob_officer`
--

INSERT INTO `prob_officer` (`prob_id`, `last`, `first`, `street`, `city`, `state`, `zip`, `phone`, `email`, `status`) VALUES
(1, 'Smith', 'Alice', '123 Oak St', 'Cityville', 'CA', '12345', '5555555555', 'alice.smith@email.com', 'A'),
(2, 'Johnson', 'Robert', '456 Maple St', 'Townburg', 'NY', '54321', '4444444444', 'robert.johnson@email.com', 'A'),
(3, 'Williams', 'Jennifer', '789 Elm St', 'Villagetown', 'TX', '67890', '3333333333', 'jennifer.williams@email.com', 'A'),
(4, 'Jones', 'David', '101 Pine St', 'Smalltown', 'FL', '11111', '2222222222', 'david.jones@email.com', 'I'),
(5, 'Davis', 'Linda', '202 Birch St', 'Metroville', 'WA', '22222', '7777777777', 'linda.davis@email.com', 'A'),
(6, 'Miller', 'Michael', '303 Cedar St', 'Cityville', 'OR', '33333', '8888888888', 'michael.miller@email.com', 'I'),
(7, 'Wilson', 'Susan', '404 Redwood St', 'Suburbia', 'AZ', '44444', '6666666666', 'susan.wilson@email.com', 'A'),
(8, 'Taylor', 'Daniel', '505 Spruce St', 'Townsville', 'NV', '55555', '9999999999', 'daniel.taylor@email.com', 'I'),
(9, 'Anderson', 'Karen', '606 Fir St', 'Smallville', 'CO', '66666', '1111111111', 'karen.anderson@email.com', 'A'),
(10, 'Brown', 'William', '707 Pine St', 'Downtown', 'UT', '77777', '1234567890', 'william.brown@email.com', 'I');

-- --------------------------------------------------------

--
-- Table structure for table `sentences`
--

CREATE TABLE `sentences` (
  `sentence_id` decimal(6,0) NOT NULL,
  `criminal_id` decimal(6,0) DEFAULT NULL,
  `type` char(1) DEFAULT NULL,
  `prob_id` decimal(5,0) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `violations` decimal(3,0) NOT NULL
) ;

--
-- Dumping data for table `sentences`
--

INSERT INTO `sentences` (`sentence_id`, `criminal_id`, `type`, `prob_id`, `start_date`, `end_date`, `violations`) VALUES
(1, 1, 'J', 1, '2022-03-01', '2022-05-01', 3),
(2, 2, 'J', 2, '2022-04-15', '2022-06-15', 1),
(4, 4, 'P', 4, '2022-07-10', '2022-09-10', 2),
(5, 5, 'J', 5, '2022-08-01', '2022-11-01', 0),
(6, 6, 'P', 6, '2022-09-15', '2023-01-15', 3),
(8, 8, 'P', 8, '2022-11-10', '2023-05-10', 0),
(9, 9, 'J', 9, '2022-12-01', '2023-07-01', 4),
(10, 10, 'P', 10, '2023-01-15', '2023-09-15', 2),
(2898, 3, 'J', 2, '2023-01-01', '2023-06-01', 0),
(382188, 6, 'H', 8, '2023-11-07', '2023-12-03', 2),
(593163, 3, 'J', 2, '2023-01-01', '2023-06-01', 0),
(644588, 3, 'J', 2, '2023-01-01', '2023-06-01', 0);

-- --------------------------------------------------------

--
-- Table structure for table `USERS`
--

CREATE TABLE `USERS` (
  `user_id` varchar(36) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(1000) DEFAULT NULL,
  `is_admin` char(1) DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `USERS`
--

INSERT INTO `USERS` (`user_id`, `name`, `email`, `password`, `is_admin`) VALUES
('1', 'user_admin', 'user123@example.com', '$2b$10$3ySq/Ph2U0LWGI4DfjUl..USd6KEXBPxpQO32UOOouKKyJ.lO31RC', 'Y'),
('2', 'user_non_admin', 'user456@example.com', '$2b$10$mhCjBnbuQMMxU18SaH6fsuwd78esL39evqb9ms2AK1l0Nd6dsM6uq', 'N'),
('83c0fde5-bfd7-4bf4-8b1c-5232db1f6488', 'Test', 'test123@example.com7', '$2a$10$BSSoHZWWvX/ZAhEnYIhwLet2RDkEgmNc4NT5sqD6yPusfbHeCyVUC', 'N'),
('e27127f5-6f2e-4389-aac2-9b3dc4e0f062', 'Test', 'purchase.me.1402@gmail.com', '$2a$10$5H8QDAc.uC31hUXUC/dOnu7A6rn.w4H.BwDMZKVButam7VJPE9OuS', 'N'),
('f3dc238f-63dd-4a56-8d8a-86ded50ffc21', 'Test', 'test123@example.com8', '$2a$10$4cc6RQkKPfuDuAqbMkIYd.tksTbl7Zhl9.akdkgFenScEUehHfGtC', 'N');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alias`
--
ALTER TABLE `alias`
  ADD PRIMARY KEY (`alias`),
  ADD KEY `criminal_id` (`criminal_id`);

--
-- Indexes for table `appeals`
--
ALTER TABLE `appeals`
  ADD PRIMARY KEY (`appeal_id`),
  ADD KEY `crime_id` (`crime_id`);

--
-- Indexes for table `crimes`
--
ALTER TABLE `crimes`
  ADD PRIMARY KEY (`crime_id`),
  ADD KEY `criminal_id` (`criminal_id`);

--
-- Indexes for table `crime_charges`
--
ALTER TABLE `crime_charges`
  ADD PRIMARY KEY (`charge_id`),
  ADD KEY `crime_id` (`crime_id`),
  ADD KEY `crime_code` (`crime_code`);

--
-- Indexes for table `crime_codes`
--
ALTER TABLE `crime_codes`
  ADD PRIMARY KEY (`crime_code`),
  ADD UNIQUE KEY `code_description` (`code_description`);

--
-- Indexes for table `crime_officers`
--
ALTER TABLE `crime_officers`
  ADD PRIMARY KEY (`crime_id`,`officer_id`),
  ADD KEY `officer_id` (`officer_id`);

--
-- Indexes for table `criminals`
--
ALTER TABLE `criminals`
  ADD PRIMARY KEY (`criminal_id`);

--
-- Indexes for table `officers`
--
ALTER TABLE `officers`
  ADD PRIMARY KEY (`officer_id`),
  ADD UNIQUE KEY `badge` (`badge`);

--
-- Indexes for table `prob_officer`
--
ALTER TABLE `prob_officer`
  ADD PRIMARY KEY (`prob_id`);

--
-- Indexes for table `sentences`
--
ALTER TABLE `sentences`
  ADD PRIMARY KEY (`sentence_id`),
  ADD KEY `criminal_id` (`criminal_id`),
  ADD KEY `prob_id` (`prob_id`);

--
-- Indexes for table `USERS`
--
ALTER TABLE `USERS`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `alias`
--
ALTER TABLE `alias`
  ADD CONSTRAINT `alias_ibfk_1` FOREIGN KEY (`criminal_id`) REFERENCES `criminals` (`criminal_id`);

--
-- Constraints for table `appeals`
--
ALTER TABLE `appeals`
  ADD CONSTRAINT `appeals_ibfk_1` FOREIGN KEY (`crime_id`) REFERENCES `crimes` (`crime_id`);

--
-- Constraints for table `crimes`
--
ALTER TABLE `crimes`
  ADD CONSTRAINT `crimes_ibfk_1` FOREIGN KEY (`criminal_id`) REFERENCES `criminals` (`criminal_id`);

--
-- Constraints for table `crime_charges`
--
ALTER TABLE `crime_charges`
  ADD CONSTRAINT `crime_charges_ibfk_1` FOREIGN KEY (`crime_id`) REFERENCES `crimes` (`crime_id`),
  ADD CONSTRAINT `crime_charges_ibfk_2` FOREIGN KEY (`crime_code`) REFERENCES `crime_codes` (`crime_code`);

--
-- Constraints for table `crime_officers`
--
ALTER TABLE `crime_officers`
  ADD CONSTRAINT `crime_officers_ibfk_1` FOREIGN KEY (`crime_id`) REFERENCES `crimes` (`crime_id`),
  ADD CONSTRAINT `crime_officers_ibfk_2` FOREIGN KEY (`officer_id`) REFERENCES `officers` (`officer_id`);

--
-- Constraints for table `sentences`
--
ALTER TABLE `sentences`
  ADD CONSTRAINT `sentences_ibfk_1` FOREIGN KEY (`criminal_id`) REFERENCES `criminals` (`criminal_id`),
  ADD CONSTRAINT `sentences_ibfk_2` FOREIGN KEY (`prob_id`) REFERENCES `prob_officer` (`prob_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
