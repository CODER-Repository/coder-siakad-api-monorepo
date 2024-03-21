ALTER TABLE classroom
ADD CONSTRAINT fk_classroom_faculty
FOREIGN KEY (faculty_id)
REFERENCES faculty (faculty_id)
ON DELETE CASCADE ON UPDATE CASCADE;