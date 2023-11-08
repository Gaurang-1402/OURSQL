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
    crime_name VARCHAR(20),
    classification CHAR(1) DEFAULT 'U',
    date_charged DATE,
    status CHAR(2) DEFAULT 'U' NOT NULL,
    hearing_date DATE CHECK (hearing_date > date_charged),
    appeal_cut_date DATE,
    PRIMARY KEY (crime_id),
    FOREIGN KEY (criminal_id) REFERENCES criminals(criminal_id)
);

-- create prob officer table

CREATE TABLE prob_officer (
    prob_id NUMERIC(5),
    last VARCHAR(15),
    first VARCHAR(10),
    street VARCHAR(30),
    city,
    state,
    zip,
    phone,
    email,
    sstatus
);

-- create sentences table
 
CREATE TABLE sentences (
    sentence_id,
    criminal_id,
    type,
    prob_id,
    start_date,
    end_date,
    n_c
);

-- create crime_charges table

CREATE TABLE crime_charges (
    charge_id NUMERIC(10),
    crime_id NUMERIC(9),
    crime_code NUMERIC(3),
    charge_status ,
    fine_amount,
    court_fee,
    amount_paid,
    payment_due_date,

);  