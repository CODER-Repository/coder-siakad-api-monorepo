CREATE TYPE gender AS ENUM (
    'male',
    'female'
);

CREATE TABLE IF NOT EXISTS lecturer (
    nip varchar(10) PRIMARY KEY,
    user_id uuid NOT NULL,
    "name" varchar(30) NOT NULL,
    type gender DEFAULT 'male'::gender,
    phone_number varchar(14) NOT NULL,
    email varchar(30) NOT NULL
);
