CREATE TABLE USERS (
    user_id VARCHAR(36),
    name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(1000),
    is_admin CHAR(1) DEFAULT 'N',
    PRIMARY KEY(user_id),
    UNIQUE(email)
);
-- hashed password: password123
INSERT INTO USERS
VALUES (
        1,
        'user_admin',
        'user123@example.com',
        '$2b$10$3ySq/Ph2U0LWGI4DfjUl..USd6KEXBPxpQO32UOOouKKyJ.lO31RC',
        'Y'
    );
    
-- hashed password: password456
INSERT INTO USERS
VALUES (
        2,
        'user_non_admin',
        'user456@example.com',
        '$2b$10$mhCjBnbuQMMxU18SaH6fsuwd78esL39evqb9ms2AK1l0Nd6dsM6uq',
        'N'
    );
    
DROP TABLE IF EXISTS USERS;