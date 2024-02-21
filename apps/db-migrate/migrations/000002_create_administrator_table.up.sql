CREATE TABLE IF NOT EXISTS administrator (
    nip VARCHAR(30) PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15) NOT NULL UNIQUE,
    user_id UUID
);
