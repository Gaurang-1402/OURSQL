DELIMITER $$

DROP TRIGGER IF EXISTS criminal_delete$$

CREATE TRIGGER criminal_delete
BEFORE DELETE ON criminals
FOR EACH ROW
BEGIN

	INSERT INTO deletion_log (table_name, deleted_id, delete_time)
    	VALUES ('criminals', OLD.criminal_id, CURRENT_TIMESTAMP);
        
END$$

DELIMITER ;



-- //////////////////////////////////////
DELIMITER $$

DROP TRIGGER IF EXISTS crime_delete$$

CREATE TRIGGER crime_delete
BEFORE DELETE ON crimes
FOR EACH ROW
BEGIN

	INSERT INTO deletion_log (table_name, deleted_id, delete_time)
    	VALUES ('crimes', OLD.crime_id, CURRENT_TIMESTAMP);
        
END$$

DELIMITER ;


-- //////////////////////////////////////

DELIMITER $$

DROP TRIGGER IF EXISTS crime_charge_delete$$

CREATE TRIGGER crime_charge_delete
BEFORE DELETE ON crime_charges
FOR EACH ROW
BEGIN

	INSERT INTO deletion_log (table_name, deleted_id, delete_time)
    	VALUES ('crime_charges', OLD.crime_charge_id, CURRENT_TIMESTAMP);
        
END$$

DELIMITER ;

-- //////////////////////////////////////

DELIMITER $$

DROP TRIGGER IF EXISTS sentence_delete$$

CREATE TRIGGER sentence_delete
BEFORE DELETE ON sentences
FOR EACH ROW
BEGIN

	INSERT INTO deletion_log (table_name, deleted_id, delete_time)
    	VALUES ('sentences', OLD.sentence_id, CURRENT_TIMESTAMP);
        
END$$

DELIMITER ;

-- //////////////////////////////////////

DELIMITER $$

DROP TRIGGER IF EXISTS officer_delete$$

CREATE TRIGGER officer_delete
BEFORE DELETE ON officers
FOR EACH ROW
BEGIN

	INSERT INTO deletion_log (table_name, deleted_id, delete_time)
    	VALUES ('officers', OLD.officer_id, CURRENT_TIMESTAMP);
        
END$$

DELIMITER ;

-- //////////////////////////////////////

DELIMITER $$

DROP TRIGGER IF EXISTS prob_officer_delete$$

CREATE TRIGGER prob_officer_delete
BEFORE DELETE ON prob_officers
FOR EACH ROW
BEGIN

	INSERT INTO deletion_log (table_name, deleted_id, delete_time)
    	VALUES ('prob_officers', OLD.prob_id, CURRENT_TIMESTAMP);
        
END$$

DELIMITER ;

-- //////////////////////////////////////

DELIMITER $$

DROP TRIGGER IF EXISTS appeal_delete$$

CREATE TRIGGER appeal_delete
BEFORE DELETE ON appeals
FOR EACH ROW
BEGIN

	INSERT INTO deletion_log (table_name, deleted_id, delete_time)
    	VALUES ('appeals', OLD.appeal_id, CURRENT_TIMESTAMP);
        
END$$

DELIMITER ;