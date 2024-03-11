CREATE TYPE day AS ENUM (
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
);

CREATE SEQUENCE schedule_id_sequence START 1;

CREATE TABLE schedule (
    schedule_id VARCHAR(20) PRIMARY KEY DEFAULT CONCAT('SCH-', nextval('schedule_id_sequence')),
    lecturer_id VARCHAR(15) NOT NULL,
    nim VARCHAR(30) NOT NULL,
    course_id VARCHAR(15) NOT NULL,
    class_id VARCHAR(15) NOT NULL,
    semester_id VARCHAR(5) NOT NULL,
    type "day" DEFAULT 'sunday'::"day",
    start_time TIME NOT NULL,
    end_time TIME NOT NULL
);

CREATE INDEX IF NOT EXISTS schedule_lecturer_idx
ON schedule (lecturer_id, nim, course_id, class_id, semester_id);
