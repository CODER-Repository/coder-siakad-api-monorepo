ALTER TABLE class
RENAME COLUMN schedule TO schedule_id;

ALTER TABLE class
ALTER COLUMN schedule_id TYPE VARCHAR(20);

ALTER TABLE course
ADD COLUMN classroom_id VARCHAR(15) NOT NULL;

ALTER TABLE schedule
ADD CONSTRAINT fk_schedule_student
FOREIGN KEY (nim)
REFERENCES student(nim);

ALTER TABLE course
ADD CONSTRAINT fk_course_classroom
FOREIGN KEY (classroom_id)
REFERENCES classroom(classroom_id);

ALTER TABLE class
ADD CONSTRAINT fk_class_lecturer
FOREIGN KEY (lecturer_id)
REFERENCES lecturer(nip);