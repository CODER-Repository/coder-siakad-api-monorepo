CREATE TABLE IF NOT EXISTS course (
    course_id VARCHAR(15) PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    credit_hours INT CHECK (credit_hours > 0)
);

CREATE UNIQUE INDEX IF NOT EXISTS course_course_id_course_name_idx ON course (course_id, course_name);