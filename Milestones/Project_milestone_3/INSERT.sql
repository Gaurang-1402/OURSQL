INSERT INTO criminals (criminal_id, last, first, street, city, state, zip, phone, v_status, p_status)
VALUES
  (1, 'Smith', 'John', '123 Main St', 'Anytown', 'CA', '12345', '555-555-5555', 'N', 'N'),
  (2, 'Johnson', 'Emily', '456 Elm St', 'Smallville', 'NY', '54321', '444-444-4444', 'Y', 'N'),
  (3, 'Williams', 'Michael', '789 Oak St', 'Another City', 'TX', '67890', '333-333-3333', 'N', 'Y'),
  (4, 'Jones', 'Sarah', '101 Pine St', 'Bigtown', 'FL', '11111', '222-222-2222', 'Y', 'Y'),
  (5, 'Davis', 'Robert', '202 Maple St', 'Villageton', 'WA', '22222', '777-777-7777', 'N', 'N'),
  (6, 'Miller', 'Lisa', '303 Birch St', 'Hometown', 'OR', '33333', '888-888-8888', 'N', 'N'),
  (7, 'Wilson', 'David', '404 Cedar St', 'Townsville', 'AZ', '44444', '666-666-6666', 'Y', 'N'),
  (8, 'Taylor', 'Jessica', '505 Fir St', 'Suburbia', 'NV', '55555', '999-999-9999', 'N', 'Y'),
  (9, 'Anderson', 'Richard', '606 Redwood St', 'Metroville', 'CO', '66666', '111-111-1111', 'Y', 'Y'),
  (10, 'Brown', 'Megan', '707 Spruce St', 'Downtown', 'UT', '77777', '123-456-7890', 'N', 'N');

INSERT INTO alias (alias_id, criminal_id, alias)
VALUES
  (1, 1, NULL),
  (2, 2, 'John Smith Alias'),
  (3, 2, 'Emily Johnson Alias'),
  (4, 3, 'Michael Williams Alias'),
  (5, 4, 'Sarah Jones Alias'),
  (6, 4, 'S. Jones Alias'),
  (7, 5, 'Robert Davis Alias'),
  (8, 6, 'Lisa Miller Alias'),
  (9, 7, 'David Wilson Alias'),
  (10, 8, 'Jessica Taylor Alias');


-- Insert values for the crimes table
INSERT INTO crimes (crime_id, criminal_id, classification, date_charged, status, hearing_date, appeal_cut_date)
VALUES
  (1, 1, 'F', '2023-11-01', 'PD', '2023-12-01', '2023-12-15'),
  (2, 2, 'M', '2023-11-02', 'PD', '2023-12-02', '2023-12-16'),
  (3, 3, 'F', '2023-11-03', 'PD', '2023-12-03', '2023-12-17'),
  (4, 4, 'M', '2023-11-04', 'PD', '2023-12-04', '2023-12-18'),
  (5, 5, 'F', '2023-11-05', 'PD', '2023-12-05', '2023-12-19'),
  (6, 6, 'M', '2023-11-06', 'PD', '2023-12-06', '2023-12-20'),
  (7, 7, 'F', '2023-11-07', 'PD', '2023-12-07', '2023-12-21'),
  (8, 8, 'M', '2023-11-08', 'PD', '2023-12-08', '2023-12-22'),
  (9, 9, 'F', '2023-11-09', 'PD', '2023-12-09', '2023-12-23'),
  (10, 10, 'M', '2023-11-10', 'PD', '2023-12-10', '2023-12-24');


-- Insert values for the crime_codes table
INSERT INTO crime_codes (crime_code, code_description)
VALUES
  (101, 'Theft'),
  (202, 'Burglary'),
  (303, 'Assault'),
  (404, 'Robbery'),
  (505, 'Drug Possession'),
  (606, 'Vandalism'),
  (707, 'Fraud'),
  (808, 'Kidnapping'),
  (909, 'Homicide'),
  (999, 'Other');

INSERT INTO sentences (sentence_id, criminal_id, type, prob_id, start_date, end_date, violations)
VALUES
  (1, 1, 'J', 101, '2022-01-01', '2022-06-30', 2),
  (2, 2, 'H', 102, '2021-11-15', '2023-05-15', 0),
  (3, 3, 'P', 103, '2022-03-10', '2022-12-31', 1),
  (4, 4, 'J', 104, '2022-02-15', '2022-08-15', 3),
  (5, 5, 'H', 105, '2022-04-20', '2023-04-20', 0),
  (6, 6, 'P', 106, '2022-06-01', '2023-06-01', 2),
  (7, 7, 'J', 107, '2022-03-05', '2022-09-05', 1),
  (8, 8, 'H', 108, '2022-05-10', '2023-05-10', 0),
  (9, 9, 'P', 109, '2022-02-28', '2022-11-30', 1),
  (10, 10, 'J', 110, '2022-04-10', '2022-10-10', 2);


INSERT INTO crime_charges (charge_id, crime_id, crime_code, charge_status, fine_amount, court_fee, amount_paid, payment_due_date)
VALUES
  (1, 1, 101, 'PD', 500.00, 50.00, 550.00, '2022-04-01'),
  (2, 2, 102, 'PD', 300.00, 30.00, 330.00, '2022-05-01'),
  (3, 3, 103, 'GL', 1000.00, 100.00, 1100.00, '2022-06-01'),
  (4, 4, 104, 'CL', 200.00, 20.00, 220.00, '2022-07-01'),
  (5, 5, 105, 'PD', 700.00, 70.00, 770.00, '2022-08-01'),
  (6, 6, 106, 'IA', 250.00, 25.00, 275.00, '2022-09-01'),
  (7, 7, 107, 'GL', 800.00, 80.00, 880.00, '2022-10-01'),
  (8, 8, 108, 'PD', 400.00, 40.00, 440.00, '2022-11-01'),
  (9, 9, 109, 'CL', 1500.00, 150.00, 1650.00, '2022-12-01'),
  (10, 10, 110, 'PD', 600.00, 60.00, 660.00, '2023-01-01');


