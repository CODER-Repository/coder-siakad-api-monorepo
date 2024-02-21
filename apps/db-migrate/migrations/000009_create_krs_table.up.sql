CREATE TABLE IF NOT EXISTS krs (
    krs_id SERIAL PRIMARY KEY,
    nim VARCHAR(30) NOT NULL,
    course_id VARCHAR(15) NOT NULL,
    semester_id VARCHAR(5) NOT NULL,
    grade BIGINT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS krs_student_course_id_idx ON krs (nim, course_id, semester_id);

