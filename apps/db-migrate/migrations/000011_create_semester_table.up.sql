CREATE TABLE IF NOT EXISTS semester (
    semester_id VARCHAR(5) PRIMARY KEY,
    year INT CHECK (year >= 2000) NOT NULL,
    start_date DATE,
    end_date DATE
);
