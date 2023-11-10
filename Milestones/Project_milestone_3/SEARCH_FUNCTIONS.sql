-- CRIME SEARCH

-- CURRENT ISSUE

-- crime code description filter
SELECT cri.crime_id, cri.classification, cri.status AS appeal_status, cco.code_description, cch.charge_status, off.first AS 'officer first name', off.last AS 'officer last name'
	FROM crimes cri, crime_charges cch, crime_codes cco, crime_officers cof, officers off
    WHERE cri.crime_id = cch.crime_id
    AND cch.crime_code = cco.crime_code
    AND cri.crime_id = cof.crime_id
    AND cof.officer_id = off.officer_id
    AND cco.code_description LIKE 'burglary';
    
-- crime classification filter
SELECT cri.crime_id, cri.classification, cri.status AS appeal_status, cco.code_description, cch.charge_status, off.first AS 'officer first name', off.last AS 'officer last name'
	FROM crimes cri, crime_charges cch, crime_codes cco, crime_officers cof, officers off
    WHERE cri.crime_id = cch.crime_id
    AND cch.crime_code = cco.crime_code
    AND cri.crime_id = cof.crime_id
    AND cof.officer_id = off.officer_id
    AND cri.classification LIKE 'F';

-- Crime Charge  status filter
SELECT cri.crime_id, cri.classification, cri.status AS appeal_status, cco.code_description, cch.charge_status, off.first AS 'officer first name', off.last AS 'officer last name'
	FROM crimes cri, crime_charges cch, crime_codes cco, crime_officers cof, officers off
    WHERE cri.crime_id = cch.crime_id
    AND cch.crime_code = cco.crime_code
    AND cri.crime_id = cof.crime_id
    AND cof.officer_id = off.officer_id
    AND cch.charge_status LIKE 'GL';

-- Crime status filter
SELECT cri.crime_id, cri.classification, cri.status AS appeal_status, cco.code_description, cch.charge_status, off.first AS 'officer first name', off.last AS 'officer last name'
	FROM crimes cri, crime_charges cch, crime_codes cco, crime_officers cof, officers off
    WHERE cri.crime_id = cch.crime_id
    AND cch.crime_code = cco.crime_code
    AND cri.crime_id = cof.crime_id
    AND cof.officer_id = off.officer_id
    AND cri.status LIKE 'CL';

-- Officer first name filter (Begins with)
SELECT cri.crime_id, cri.classification, cri.status AS appeal_status, cco.code_description, cch.charge_status, off.first AS 'officer first name', off.last AS 'officer last name'
	FROM crimes cri, crime_charges cch, crime_codes cco, crime_officers cof, officers off
    WHERE cri.crime_id = cch.crime_id
    AND cch.crime_code = cco.crime_code
    AND cri.crime_id = cof.crime_id
    AND cof.officer_id = off.officer_id
    AND off.first LIKE 'S%';

-- Officer first name filter (Contains)
SELECT cri.crime_id, cri.classification, cri.status AS appeal_status, cco.code_description, cch.charge_status, off.first AS 'officer first name', off.last AS 'officer last name'
	FROM crimes cri, crime_charges cch, crime_codes cco, crime_officers cof, officers off
    WHERE cri.crime_id = cch.crime_id
    AND cch.crime_code = cco.crime_code
    AND cri.crime_id = cof.crime_id
    AND cof.officer_id = off.officer_id
    AND off.first LIKE '%a%';

-- Officer last name filter (Begins with)
SELECT cri.crime_id, cri.classification, cri.status AS appeal_status, cco.code_description, cch.charge_status, off.first AS 'officer first name', off.last AS 'officer last name'
	FROM crimes cri, crime_charges cch, crime_codes cco, crime_officers cof, officers off
    WHERE cri.crime_id = cch.crime_id
    AND cch.crime_code = cco.crime_code
    AND cri.crime_id = cof.crime_id
    AND cof.officer_id = off.officer_id
    AND off.last LIKE 'D%';

-- Officer last name filter (Contains)
SELECT cri.crime_id, cri.classification, cri.status AS appeal_status, cco.code_description, cch.charge_status, off.first AS 'officer first name', off.last AS 'officer last name'
	FROM crimes cri, crime_charges cch, crime_codes cco, crime_officers cof, officers off
    WHERE cri.crime_id = cch.crime_id
    AND cch.crime_code = cco.crime_code
    AND cri.crime_id = cof.crime_id
    AND cof.officer_id = off.officer_id
    AND off.last LIKE '%e%';



-- CRIMINAL SEARCH

-- criminal first name filter (begin with) 

SELECT cri.criminal_id, cri.first AS 'criminal first name', cri.last AS 'criminal last name', cri.state, cri.v_status, cri.p_status, sen.type
	FROM criminals cri, sentences sen
    WHERE cri.criminal_id = sen.criminal_id
    AND cri.first LIKE 'J%';

-- criminal first name filter (contain) 
SELECT cri.criminal_id, cri.first AS 'criminal first name', cri.last AS 'criminal last name', cri.state, cri.v_status, cri.p_status, sen.type
	FROM criminals cri, sentences sen
    WHERE cri.criminal_id = sen.criminal_id
    AND cri.first LIKE '%o%';

-- criminal last name filter (begin with) 
SELECT cri.criminal_id, cri.first AS 'criminal first name', cri.last AS 'criminal last name', cri.state, cri.v_status, cri.p_status, sen.type
	FROM criminals cri, sentences sen
    WHERE cri.criminal_id = sen.criminal_id
    AND cri.last LIKE 'W%';

-- criminal last name filter (contain with) 
SELECT cri.criminal_id, cri.first AS 'criminal first name', cri.last AS 'criminal last name', cri.state, cri.v_status, cri.p_status, sen.type
	FROM criminals cri, sentences sen
    WHERE cri.criminal_id = sen.criminal_id
    AND cri.last LIKE '%i%';

-- criminal state filter
SELECT cri.criminal_id, cri.first AS 'criminal first name', cri.last AS 'criminal last name', cri.state, cri.v_status, cri.p_status, sen.type
	FROM criminals cri, sentences sen
    WHERE cri.criminal_id = sen.criminal_id
    AND cri.state LIKE 'NY';


-- criminal violent offender status filter
SELECT cri.criminal_id, cri.first AS 'criminal first name', cri.last AS 'criminal last name', cri.state, cri.v_status, cri.p_status, sen.type
	FROM criminals cri, sentences sen
    WHERE cri.criminal_id = sen.criminal_id
    AND cri.v_status LIKE 'Y';

-- criminal probation status filter
SELECT cri.criminal_id, cri.first AS 'criminal first name', cri.last AS 'criminal last name', cri.state, cri.v_status, cri.p_status, sen.type
	FROM criminals cri, sentences sen
    WHERE cri.criminal_id = sen.criminal_id
    AND cri.p_status LIKE 'Y';

-- criminal sentence type search
SELECT cri.criminal_id, cri.first AS 'criminal first name', cri.last AS 'criminal last name', cri.state, cri.v_status, cri.p_status, sen.type
	FROM criminals cri, sentences sen
    WHERE cri.criminal_id = sen.criminal_id
    AND sen.type LIKE 'J';


-- OFFICER SEARCH
-- Officer first name filter (Begins with)
SELECT officer_id, first AS 'officer first name', last AS 'officer last name', precinct, badge, status
	FROM officers
    WHERE first LIKE 'M%';

-- Officer first name filter (Contains)
SELECT officer_id, first AS 'officer first name', last AS 'officer last name', precinct, badge, status
	FROM officers
    WHERE first LIKE '%a%';

-- Officer last name filter (Begins with)
SELECT officer_id, first AS 'officer first name', last AS 'officer last name', precinct, badge, status
	FROM officers
    WHERE last LIKE 'B%';

-- Officer last name filter (Contains)
SELECT officer_id, first AS 'officer first name', last AS 'officer last name', precinct, badge, status
	FROM officers
    WHERE last LIKE '%o%';

-- Officer badge number filter (starts with)
SELECT officer_id, first AS 'officer first name', last AS 'officer last name', precinct, badge, status
	FROM officers
    WHERE badge LIKE 'B0%';

-- Officer badge number filter (contain)
SELECT officer_id, first AS 'officer first name', last AS 'officer last name', precinct, badge, status
	FROM officers
    WHERE badge LIKE '%01%';


-- Officer precinct filter
SELECT officer_id, first AS 'officer first name', last AS 'officer last name', precinct, badge, status
	FROM officers
    WHERE precinct LIKE 'P003';

-- Officer status filter
SELECT officer_id, first AS 'officer first name', last AS 'officer last name', precinct, badge, status
	FROM officers
    WHERE status LIKE 'A';



-- PROB OFFICER SEARCH
-- prob officer first name filter(Begins with)
SELECT first AS 'Probation Officer First Name', last AS 'Probation Officer Last Name', status
	FROM prob_officer
    WHERE first LIKE 'J%'


-- prob officer first name filter(contain)
SELECT first AS 'Probation Officer First Name', last AS 'Probation Officer Last Name', status
	FROM prob_officer
    WHERE first LIKE '%e%';

-- prob officer last name filter (starts with)
SELECT first AS 'Probation Officer First Name', last AS 'Probation Officer Last Name', status
	FROM prob_officer
    WHERE last LIKE 'M%';

-- prob officer last name filter (contains)
SELECT first AS 'Probation Officer First Name', last AS 'Probation Officer Last Name', status
	FROM prob_officer
    WHERE last LIKE '%e%';

-- prob officer status filter
SELECT first AS 'Probation Officer First Name', last AS 'Probation Officer Last Name', status
	FROM prob_officer
    WHERE status LIKE 'A'



