CREATE TYPE member_status AS ENUM ('host', 'pending', 'joined');

CREATE TABLE IF NOT EXISTS user_account (
    u_id BIGSERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS party (
    p_id BIGSERIAL NOT NULL PRIMARY KEY,
    description TEXT NULL,
    location TEXT NULL,
    time TIMESTAMPTZ NOT NULL
);

CREATE TABLE party_member (
    p_id BIGINT REFERENCES party(p_id),
    u_id BIGINT REFERENCES user_account(u_id),
    member_status member_status NOT NULL
);