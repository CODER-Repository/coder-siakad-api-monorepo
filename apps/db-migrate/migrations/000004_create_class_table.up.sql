CREATE TABLE IF NOT EXISTS class (
    class_id VARCHAR(15) PRIMARY KEY,
    course_id VARCHAR(15) NOT NULL,
    lecturer_id VARCHAR(15) NOT NULL,
    semester_id VARCHAR(5) NOT NULL,
    classroom_id VARCHAR(15) NOT NULL,
    schedule VARCHAR(100) NOT NULL
);
