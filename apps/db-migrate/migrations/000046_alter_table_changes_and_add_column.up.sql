ALTER TABLE class
DROP COLUMN schedule_id;

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

ALTER TABLE schedule
ADD CONSTRAINT fk_student_schedule
FOREIGN KEY (nim)
REFERENCES student(nim);