CREATE TABLE IF NOT EXISTS address (
    street TEXT,
    city VARCHAR(100),
    zip_code VARCHAR(10),
    country VARCHAR(30),
    nim VARCHAR(30) NOT NULL
);

CREATE INDEX IF NOT EXISTS address_student_id_idx ON address (student_id);
