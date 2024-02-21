ALTER TABLE krs
ADD CONSTRAINT fk_krs_course
FOREIGN KEY (course_id)
REFERENCES course (course_id);