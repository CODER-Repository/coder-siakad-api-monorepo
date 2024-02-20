CREATE TABLE IF NOT EXISTS krs (
    krs_id SERIAL PRIMARY KEY,
    student_id UUID NOT NULL,
    course_id VARCHAR(15) NOT NULL,
    semester_id VARCHAR(5) NOT NULL,
    grade BIGINT
);

CREATE INDEX IF NOT EXISTS krs_student_course_id_idx ON krs (student_id, course_id, semester_id);
