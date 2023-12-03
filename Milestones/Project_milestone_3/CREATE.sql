-- create criminals table

CREATE TABLE criminals (
    criminal_id NUMERIC(6),
    last VARCHAR(15),
    first VARCHAR(10),
    street VARCHAR(30),
    city VARCHAR(20),
    state CHAR(2),
    zip CHAR(5),
    phone CHAR(10),
    v_status CHAR(1) DEFAULT 'N',
    p_status CHAR(1) DEFAULT 'N',
    CONSTRAINT v_status_coding CHECK(v_status = 'Y' OR v_status = 'N'),
    CONSTRAINT p_status_coding CHECK(p_status = 'Y' OR p_status = 'N'),
    PRIMARY KEY (criminal_id)
);


-- create alias table
CREATE TABLE alias(
    alias_id NUMERIC(6),
    criminal_id NUMERIC(6),
    alias VARCHAR(20) DEFAULT 'N',
    PRIMARY KEY (alias),
    FOREIGN KEY (criminal_id) REFERENCES criminals(criminal_id)
);

-- create crimes table
CREATE TABLE crimes (
    crime_id NUMERIC(9),
    criminal_id NUMERIC(6),
    classification CHAR(1) DEFAULT 'U',
    date_charged DATE,
    status CHAR(2) NOT NULL,
    hearing_date DATE,
    appeal_cut_date DATE,
    CONSTRAINT crime_date_chk CHECK (hearing_date > date_charged),
    CONSTRAINT classification_coding CHECK (classification = 'F' OR classification = 'M' OR classification = 'O' OR classification = 'U'),
    CONSTRAINT crime_status_coding CHECK (status = 'CL' OR status = 'CA' OR status = 'IA'),
    PRIMARY KEY (crime_id),
    FOREIGN KEY (criminal_id) REFERENCES criminals(criminal_id)
);

-- create prob officer table

CREATE TABLE prob_officer (
    prob_id NUMERIC(5),
    last VARCHAR(15),
    first VARCHAR(10),
    street VARCHAR(30),
    city VARCHAR(20),
    state CHAR(2),
    zip CHAR(5),
    phone CHAR(10),
    email VARCHAR (30),
    status CHAR(1) NOT NULL,
    CONSTRAINT pof_status_coding CHECK (status = 'A' OR status = 'I'),
    PRIMARY KEY(prob_id)
);

-- create sentences table
 
CREATE TABLE sentences (
    sentence_id NUMERIC(6),
    criminal_id NUMERIC(6),
    type CHAR(1),
    prob_id NUMERIC(5),
    start_date DATE,
    end_date DATE,
    violations NUMERIC(3) NOT NULL,
    CONSTRAINT sentence_date_chk CHECK (end_date > start_date),
    CONSTRAINT sentence_type_coding CHECK (type = 'J' OR type = 'H' OR type = 'P'),
    PRIMARY KEY(sentence_id),
    FOREIGN KEY(criminal_id) REFERENCES criminals(criminal_id),
    FOREIGN KEY(prob_id) REFERENCES prob_officer(prob_id)
);

-- create crime codes table

CREATE TABLE crime_codes (
    crime_code NUMERIC(3) NOT NULL,
    code_description VARCHAR(30) NOT NULL UNIQUE,
    PRIMARY KEY(crime_code)
);

-- create crime_charges table

CREATE TABLE crime_charges (
    charge_id NUMERIC(10),
    crime_id NUMERIC(9),
    crime_code NUMERIC(3),
    charge_status CHAR(2),
    fine_amount NUMERIC(7, 2),
    court_fee NUMERIC(7, 2),
    amount_paid NUMERIC(7, 2),
    payment_due_date DATE,
    CONSTRAINT charge_status_coding CHECK(charge_status = 'PD' OR charge_status = 'GL' OR charge_status = 'NG'),
    PRIMARY KEY(charge_id),
    FOREIGN KEY(crime_id) REFERENCES crimes(crime_id),
    FOREIGN KEY(crime_code) REFERENCES crime_codes(crime_code)
);  

-- create officers table

CREATE TABLE officers (
    officer_id NUMERIC(8),
    last VARCHAR(15),
    first VARCHAR(10),
    precinct CHAR(4) NOT NULL,
    badge VARCHAR(14) UNIQUE,
    phone CHAR(10),
    status CHAR(1) DEFAULT 'A',
    CONSTRAINT officer_status_coding CHECK(status = 'A' OR status = 'I'),
    PRIMARY KEY(officer_id)
);

-- create crime officers table

CREATE TABLE crime_officers (
    crime_id NUMERIC(8),
    officer_id NUMERIC(9),
    PRIMARY KEY(crime_id, officer_id),
    FOREIGN KEY (crime_id) REFERENCES crimes(crime_id),
    FOREIGN KEY (officer_id) REFERENCES officers(officer_id)
);

-- create appeals table

CREATE TABLE appeals (
    appeal_id NUMERIC(5),
    crime_id NUMERIC(9),
    filing_date DATE,
    hearing_date DATE,
    status CHAR(1) DEFAULT 'P',
    CONSTRAINT appeal_status_coding CHECK(status = 'P' OR status = 'A' OR status = 'D'),
    PRIMARY KEY (appeal_id),
    FOREIGN KEY(crime_id) REFERENCES crimes(crime_id)
);  


CREATE TABLE deletion_log(
	event_id INT AUTO_INCREMENT PRIMARY KEY,
    table_name VARCHAR(100),
    deleted_id NUMERIC(10),
    delete_time TIME
);

