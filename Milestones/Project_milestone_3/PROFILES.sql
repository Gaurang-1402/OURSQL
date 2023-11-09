-- CRIME PROFILE

SELECT crm.first AS 'criminal first', crm.last AS 'criminal last', cco.code_description, cri.classification, off.first AS 'officer first', off.last AS 'officer last', cri.date_charged, cri.status AS 'appeal availability status', cri.hearing_date, cri.appeal_cut_date, cch.charge_status, cch.fine_amount, cch.court_fee, cch.amount_paid, cch.payment_due_date, app.filing_date, app.hearing_date, app.status AS 'appeal status'
	FROM crimes cri, criminals crm, crime_charges cch, crime_codes cco, crime_officers cof, officers off, appeals app
    WHERE cri.crime_id = cch.crime_id
    AND cri.criminal_id = crm.criminal_id
    AND cch.crime_code = cco.crime_code
    AND cri.crime_id = cof.crime_id
    AND cof.officer_id = off.officer_id
    AND app.crime_id = cri.crime_id;


-- CRIMINAL PROFILE
SELECT crm.first AS 'criminal first', crm.last AS 'criminal last', ali.alias, crm.street, crm.city, crm.state, crm.zip, crm.phone, crm.v_status, crm.p_status, pof.first AS 'probation first', pof.last AS 'probation last', cco.code_description, sen.type, sen.start_date, sen.end_date, sen.violations
	FROM criminals crm, alias ali, sentences sen, prob_officer pof, crimes cri, crime_charges cch, crime_codes cco
    WHERE crm.criminal_id = ali.criminal_id
    	AND crm.criminal_id = sen.criminal_id
    	AND sen.prob_id = pof.prob_id
        AND crm.criminal_id = cri.criminal_id
        AND cri.crime_id = cch.crime_id
        AND cch.crime_code = cco.crime_code;


-- OFFICER PROFILE
SELECT * FROM officers;

-- PROBATION OFFICER PROFILE
SELECT * FROM prob_officer;