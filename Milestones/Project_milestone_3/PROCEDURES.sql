-- PROBATION OFFICER SEARCH PROCEDURE
DELIMITER $$

DROP PROCEDURE IF EXISTS pof_search_proc$$

CREATE PROCEDURE pof_search_proc(
    IN input_first VARCHAR(255),
    IN input_first_search_type VARCHAR(10),
    IN input_last VARCHAR(255),
    IN input_last_search_type VARCHAR(10),
    IN input_status VARCHAR(255)
)
BEGIN
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

CALL pof_search_proc(NULL, 'starts', 'e', 'contains', NULL);