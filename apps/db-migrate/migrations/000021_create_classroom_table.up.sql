CREATE TABLE IF NOT EXISTS classroom (
    classroom_id VARCHAR(15) PRIMARY KEY,
    classroom_name VARCHAR(50) NOT NULL,
    faculty_id int2 NOT NULL
)