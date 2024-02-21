ALTER TABLE class
ADD CONSTRAINT fk_class_semester
FOREIGN KEY (semester_id)
REFERENCES semester (semester_id);