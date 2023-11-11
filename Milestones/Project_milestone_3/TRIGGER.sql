DELIMITER $$

DROP TRIGGER IF EXISTS BeforeInsertOnCharges$$

CREATE TRIGGER BeforeInsertOnCharges
BEFORE INSERT ON crime_charges
FOR EACH ROW
BEGIN
    DECLARE charge_status_value VARCHAR(255);
    DECLARE status_value VARCHAR(255);
    

    -- Assuming crime_id is a unique key that relates crimes and crime_charges
    SELECT crime_charges.charge_status, crimes.status INTO charge_status_value, status_value
    FROM crime_charges, crimes
    WHERE crime_charges.crime_id = crimes.crime_id AND crimes.crime_id = NEW.crime_id;

    -- Enforce the constraint
    IF charge_status_value = 'NG' AND status_value != 'CL' THEN
    	/*ALTER TABLE crimes
        	SET status = 'CL'
            WHERE crime_id = NEW.crime_id;*/
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Constraint charge_appeal_match_chk violation: charge_status is NG but status is not CL';
    END IF;
END $$

DELIMITER ;

SELECT * FROM crimes, crime_charges WHERE crimes.crime_id = crime_charges.crime_id;


INSERT INTO crimes (crime_id, criminal_id, classification, date_charged, status, hearing_date, appeal_cut_date)
VALUES
  (11, 5, 'U', '2022-05-12', 'CL', '2022-07-15', '2022-07-05'),
  (12, 6, 'U', '2022-06-25', 'CL', '2022-08-20', '2022-08-10'),
  (13, 5, 'U', '2022-05-12', 'CA', '2022-07-15', '2022-07-05'),
  (14, 6, 'U', '2022-06-25', 'CA', '2022-08-20', '2022-08-10');
 
 
INSERT INTO crime_charges (charge_id, crime_id, crime_code, charge_status, fine_amount, court_fee, amount_paid, payment_due_date)
VALUES
  (11, 11, 107, 'GL', 800.00, 80.00, 880.00, '2022-10-01'),
  (12, 12, 108, 'GL', 400.00, 40.00, 440.00, '2022-11-01'),
  (13, 13, 109, 'GL', 1500.00, 150.00, 1650.00, '2022-12-01'),
  (14, 14, 110, 'GL', 600.00, 60.00, 660.00, '2023-01-01');

/*DELETE FROM crime_charges WHERE crime_charges.charge_id IN (11, 12, 13, 14);

DELETE FROM crimes WHERE crimes.crime_id IN (11, 12, 13, 14);/*