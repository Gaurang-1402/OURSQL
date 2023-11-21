CREATE TABLE USERS (
    user_id NUMERIC(8),
    -- last VARCHAR(15),
    -- first VARCHAR(10),
    email VARCHAR(100),
    password VARCHAR(1000),
    is_admin CHAR(1) DEFAULT 'N',
    PRIMARY KEY(email)
);


-- hashed password: password123
INSERT INTO USERS VALUES (1, 'user123', '$2b$10$3ySq/Ph2U0LWGI4DfjUl..USd6KEXBPxpQO32UOOouKKyJ.lO31RC', 'Y');

-- hashed password: password456
INSERT INTO USERS VALUES (2, 'user456', '$2b$10$mhCjBnbuQMMxU18SaH6fsuwd78esL39evqb9ms2AK1l0Nd6dsM6uq', 'N');

DROP TABLE IF EXISTS USERS;