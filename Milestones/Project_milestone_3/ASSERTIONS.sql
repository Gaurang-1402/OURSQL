(11, 5, 'U', '2022-05-12', 'CA', '2022-07-15', '2022-07-05'),
(12, 6, 'U', '2022-06-25', 'CA', '2022-08-20', '2022-08-10')



DELIMITER $$

DROP TRIGGER IF EXISTS BeforeInsertOnCrimes$$

CREATE TRIGGER BeforeInsertOnCrimes
BEFORE INSERT ON crimes
FOR EACH ROW
BEGIN
    DECLARE charge_status_value VARCHAR(255);
    DECLARE status_value VARCHAR(255);

    -- Assuming crime_id is a unique key that relates crimes and crime_charges
    SELECT charge_status, status INTO charge_status_value, status_value
    FROM crime_charges
    WHERE crime_charges.crime_id = NEW.crime_id;

    -- Enforce the constraint
    IF charge_status_value = 'NG' AND status_value != 'CL' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Constraint charge_appeal_match_chk violation: charge_status is NG but status is not CL';
    END IF;
END $$

DELIMITER ;

INSERT INTO crimes(crime_id, criminal_id, classification, date_charged, status, hearing_date, appeal_cut_date)
	VALUES (11, 5, 'U', '2022-05-12', 'CA', '2022-07-15', '2022-07-05'),
		(12, 6, 'U', '2022-06-25', 'CA', '2022-08-20', '2022-08-10');