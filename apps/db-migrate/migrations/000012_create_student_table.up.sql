CREATE TABLE IF NOT EXISTS student (
    nim VARCHAR(30) PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    major_id VARCHAR(30) NOT NULL,
    entry_year DATE NOT NULL,
    birth_date DATE NOT NULL,
    address_id VARCHAR(10) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    user_id UUID NOT NULL,
    CONSTRAINT check_email_format CHECK (email ~* '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
);

CREATE INDEX IF NOT EXISTS student_nim_email_fullname_idx ON student (nim, email, full_name);
