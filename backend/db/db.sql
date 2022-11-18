CREATE TYPE member_status AS ENUM ('host', 'pending', 'joined');

CREATE TABLE IF NOT EXISTS user_account (
    user_uuid UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(100) NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS party (
    party_uuid UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    party_name TEXT NOT NULL,
    description TEXT NULL,
    location TEXT NOT NULL,
    date_time TIMESTAMP NOT NULL
);

CREATE TABLE party_member (
    party_uuid UUID REFERENCES party(party_uuid) ON DELETE CASCADE,
    user_uuid UUID REFERENCES user_account(user_uuid) ON DELETE CASCADE,
    member_status member_status NOT NULL
);