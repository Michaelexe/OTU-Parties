DROP TABLE IF EXISTS member;
DROP TABLE IF EXISTS party;

CREATE TABLE member (
    u_id BIGSERIAL NOT NULL PRIMARY KEY,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100),
    name VARCHAR(100)
);

CREATE TABLE party (
    p_id BIGSERIAL NOT NULL PRIMARY KEY,
    description VARCHAR(1000)
);

CREATE TYPE member_status AS ENUM ('host', 'pending', 'joined');
CREATE TABLE party_user (
    p_id BIGINT REFERENCES party (p_id),
    u_id BIGINT REFERENCES member (u_id),
    member_status member_status
);