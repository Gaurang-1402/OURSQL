
CREATE TABLE criminals(
    criminal_id NUMERIC(8),
    name VARCHAR(100),
    add_street VARCHAR(255),
    add_city VARCHAR(255),
    add_state VARCHAR(255),
    add_zip NUMERIC(5),
    phone VARCHAR(20),
    violent_offender BOOLEAN,
    probation BOOLEAN,
    PRIMARY KEY (criminal_id)
);

-- ==================================================

CREATE TABLE sentences(
    sentence_id NUMERIC(8),
    criminal_id NUMERIC(8),
    start_date DATE,
    end_date DATE,
    n_viol NUMERIC(3),
    type VARCHAR(20),
    PRIMARY KEY (sentence_id),
    FOREIGN KEY (criminal_id) REFERENCES criminals(criminal_id)
);

-- ==================================================

CREATE TABLE crime_cases(
    case_id NUMERIC(8), 
    classification VARCHAR(20),
    charge_date DATE, 
    appeal_status VARCHAR(20), 
    hearing_date DATE, 
    appeal_cutoff DATE, 
    fines NUMERIC(12), 
    fees NUMERIC(12),
    amount_paid NUMERIC(12), 
    payment_due NUMERIC(12),
    charge_status VARCHAR(20),
    PRIMARY KEY (case_id)
);

-- ==================================================

CREATE TABLE appeals(
    appeal_id NUMERIC(8),
    case_id NUMERIC(8),
    filing_date DATE,
    hearing_date DATE,
    status VARCHAR(20),
    PRIMARY KEY (appeal_id),
    FOREIGN KEY (case_id) REFERENCES crime_cases(case_id)
);

-- ==================================================

CREATE TABLE officers(
    badge_number NUMERIC(8),
    name VARCHAR(255),
    precinct VARCHAR(255),
    phone_number VARCHAR(20),
    status VARCHAR(20),
    PRIMARY KEY (badge_number)
);

-- ==================================================

CREATE TABLE codes(
    code_id NUMERIC(8),
    description VARCHAR(255),
    PRIMARY KEY (code_id)
);

-- ==================================================

CREATE TABLE criminal_charges(
    criminal_id NUMERIC(8),
    case_id NUMERIC(8),
    PRIMARY KEY (criminal_id, case_id),
    FOREIGN KEY (criminal_id) REFERENCES criminals(criminal_id),
    FOREIGN KEY (case_id) REFERENCES crime_cases(case_id)
);


-- ==================================================

CREATE TABLE criminal_aliases(
    alias VARCHAR(255),
    criminal_id NUMERIC(8),
    PRIMARY KEY (alias, criminal_id),
    FOREIGN KEY (criminal_id) REFERENCES criminals(criminal_id)
);

-- ==================================================

CREATE TABLE case_codes(
    case_id NUMERIC(8),
    code_id NUMERIC(8),
    PRIMARY KEY (case_id, code_id),
    FOREIGN KEY (case_id) REFERENCES crime_cases(case_id),
    FOREIGN KEY (code_id) REFERENCES codes(code_id)
);

-- ==================================================


CREATE TABLE arresting_officers(
    case_id NUMERIC(8),
    badge_number NUMERIC(8),
    PRIMARY KEY (case_id, badge_number),
    FOREIGN KEY (case_id) REFERENCES crime_cases(case_id),
    FOREIGN KEY (badge_number) REFERENCES officers(badge_number)
);


