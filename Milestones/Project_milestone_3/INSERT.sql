INSERT INTO criminals (criminal_id, last, first, street, city, state, zip, phone, v_status, p_status)
VALUES
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

INSERT INTO alias (alias_id, criminal_id, alias)
VALUES
  (1, 1, 'John Doe'),
  (2, 1, 'Jay Smith'),
  (3, 2, 'Emily Johnson'),
  (4, 3, 'Mike Williams'),
  (5, 4, 'Sara Jones'),
  (6, 5, 'Rob Davis'),
  (7, 6, 'Lisa Miller'),
  (8, 7, 'David Wilson'),
  (9, 8, 'Jess Taylor'),
  (10, 10, 'Megan Brown');

INSERT INTO crimes (crime_id, criminal_id, classification, date_charged, status, hearing_date, appeal_cut_date)
VALUES
  (1, 1, 'F', '2022-01-15', 'CL', '2022-03-20', '2022-03-10'),
  (2, 2, 'O', '2022-02-10', 'CA', '2022-04-15', '2022-04-05'),
  (3, 3, 'F', '2022-03-20', 'IA', '2022-05-25', '2022-05-15'),
  (4, 4, 'F', '2022-04-05', 'CL', '2022-06-10', '2022-06-05'),
  (5, 5, 'U', '2022-05-12', 'CA', '2022-07-15', '2022-07-05'),
  (6, 6, 'U', '2022-06-25', 'CA', '2022-08-20', '2022-08-10'),
  (7, 7, 'M', '2022-07-10', 'IA', '2022-09-15', '2022-09-05'),
  (8, 8, 'O', '2022-08-15', 'CL', '2022-10-20', '2022-10-10'),
  (9, 9, 'U', '2022-09-10', 'IA', '2022-11-15', '2022-11-05'),
  (10, 10, 'M', '2022-10-25', 'CL', '2022-12-30', '2022-12-20');

INSERT INTO prob_officer (prob_id, last, first, street, city, state, zip, phone, email, status)
VALUES
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

INSERT INTO sentences (sentence_id, criminal_id, type, prob_id, start_date, end_date, violations)
VALUES
  (1, 1, 'J', 1, '2022-03-01', '2022-05-01', 3),
  (2, 2, 'P', 2, '2022-04-15', '2022-06-15', 1),
  (3, 3, 'H', 3, '2022-06-01', '2022-09-01', 0),
  (4, 4, 'P', 4, '2022-07-10', '2022-09-10', 2),
  (5, 5, 'J', 5, '2022-08-01', '2022-11-01', 0),
  (6, 6, 'P', 6, '2022-09-15', '2023-01-15', 3),
  (7, 7, 'H', 7, '2022-10-01', '2023-03-01', 1),
  (8, 8, 'P', 8, '2022-11-10', '2023-05-10', 0),
  (9, 9, 'J', 9, '2022-12-01', '2023-07-01', 4),
  (10, 10, 'P', 10, '2023-01-15', '2023-09-15', 2);

INSERT INTO crime_codes (crime_code, code_description)
VALUES
  (101, 'Theft'),
  (102, 'Assault'),
  (103, 'Burglary'),
  (104, 'Drug Possession'),
  (105, 'Robbery'),
  (106, 'Vandalism'),
  (107, 'Fraud'),
  (108, 'DUI'),
  (109, 'Homicide'),
  (110, 'Kidnapping');

INSERT INTO crime_charges (charge_id, crime_id, crime_code, charge_status, fine_amount, court_fee, amount_paid, payment_due_date)
VALUES
  (1, 1, 101, 'PD', 500.00, 50.00, 550.00, '2022-04-01'),
  (2, 2, 102, 'PD', 300.00, 30.00, 330.00, '2022-05-01'),
  (3, 3, 103, 'GL', 1000.00, 100.00, 1100.00, '2022-06-01'),
  (4, 4, 104, 'GL', 200.00, 20.00, 220.00, '2022-07-01'),
  (5, 5, 105, 'NG', 700.00, 70.00, 770.00, '2022-08-01'),
  (6, 6, 106, 'NG', 250.00, 25.00, 275.00, '2022-09-01'),
  (7, 7, 107, 'GL', 800.00, 80.00, 880.00, '2022-10-01'),
  (8, 8, 108, 'NG', 400.00, 40.00, 440.00, '2022-11-01'),
  (9, 9, 109, 'GL', 1500.00, 150.00, 1650.00, '2022-12-01'),
  (10, 10, 110, 'PD', 600.00, 60.00, 660.00, '2023-01-01');

INSERT INTO officers (officer_id, last, first, precinct, badge, phone, status)
VALUES
  (1, 'Smith', 'John', 'P001', 'B0001', '5555555555', 'A'),
  (2, 'Johnson', 'Emily', 'P002', 'B0002', '4444444444', 'A'),
  (3, 'Williams', 'Michael', 'P003', 'B0003', '3333333333', 'A'),
  (4, 'Jones', 'Sarah', 'P004', 'B0004', '2222222222', 'I'),
  (5, 'Davis', 'Robert', 'P005', 'B0005', '7777777777', 'A'),
  (6, 'Miller', 'Lisa', 'P006', 'B0006', '8888888888', 'A'),
  (7, 'Wilson', 'David', 'P007', 'B0007', '6666666666', 'A'),
  (8, 'Taylor', 'Jessica', 'P008', 'B0008', '9999999999', 'I'),
  (9, 'Anderson', 'Richard', 'P0009', 'B0009', '1111111111', 'A'),
  (10, 'Brown', 'Megan', 'P010', 'B0010', '1234567890', 'A');

INSERT INTO crime_officers (crime_id, officer_id)
VALUES
  (1, 1),
  (2, 2),
  (3, 3),
  (4, 4),
  (5, 5),
  (6, 6),
  (7, 7),
  (8, 8),
  (9, 9),
  (10, 10);

INSERT INTO appeals (appeal_id, crime_id, filing_date, hearing_date, status)
VALUES
  (1, 1, '2022-04-05', '2022-04-25', 'P'),
  (2, 2, '2022-05-10', '2022-05-30', 'P'),
  (3, 3, '2022-06-15', '2022-07-05', 'A'),
  (4, 4, '2022-07-20', '2022-08-10', 'A'),
  (5, 5, '2022-08-25', '2022-09-15', 'A'),
  (6, 6, '2022-09-30', '2022-10-20', 'P'),
  (7, 7, '2022-10-05', '2022-10-25', 'D'),
  (8, 8, '2022-11-10', '2022-11-30', 'D'),
  (9, 9, '2022-12-15', '2023-01-04', 'D'),
  (10, 10, '2023-01-20', '2023-02-09', 'P');

