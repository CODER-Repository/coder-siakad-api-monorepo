ALTER TABLE class
ADD CONSTRAINT fk_class_course
FOREIGN KEY (course_id)
REFERENCES course (course_id);