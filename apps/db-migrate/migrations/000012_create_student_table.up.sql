CREATE TABLE IF NOT EXISTS student (
    nim VARCHAR(30) PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    full_name VARCHAR(100),
    major_id VARCHAR(30),
    entry_year DATE,
    birth_date DATE,
    address_id VARCHAR(10),
    phone_number VARCHAR(15),
    user_id UUID NOT NULL
);

CREATE INDEX IF NOT EXISTS student_nim_email_fullname_idx ON student (nim, email, full_name);
