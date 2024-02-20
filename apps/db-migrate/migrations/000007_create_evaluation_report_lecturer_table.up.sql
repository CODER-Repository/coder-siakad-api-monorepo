CREATE TABLE IF NOT EXISTS evaluation_report_lecturer (
    evaluation_report_id VARCHAR(30) PRIMARY KEY,
    student_id UUID NOT NULL,
    lecturer_id VARCHAR(10) NOT NULL,
    semester_id INT NOT NULL,
    rating INT DEFAULT 0,
    feedback TEXT
);

CREATE INDEX IF NOT EXISTS student_lecturer_semester_id_idx ON evaluation_report_lecturer (student_id, lecturer_id, semester_id);
