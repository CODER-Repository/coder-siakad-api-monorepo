CREATE TABLE IF NOT EXISTS attendance (
    id SERIAL PRIMARY KEY,
    student_id VARCHAR(15) NOT NULL,
    classroom_id VARCHAR(15) NOT NULL,
    date DATE NOT NULL,
    status VARCHAR(10) NOT NULL
);