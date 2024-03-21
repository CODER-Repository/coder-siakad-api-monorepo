ALTER TABLE class
ADD CONSTRAINT fk_class_classroom
FOREIGN KEY (classroom_id)
REFERENCES classroom (classroom_id)
ON DELETE CASCADE ON UPDATE CASCADE;