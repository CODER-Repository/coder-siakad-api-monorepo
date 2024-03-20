ALTER TABLE course
ADD COLUMN classroom_id VARCHAR(15) NOT NULL;

ALTER TABLE course
ADD CONSTRAINT fk_course_classroom
FOREIGN KEY (classroom_id)
REFERENCES classroom (classroom_id) ON DELETE CASCADE ON UPDATE CASCADE;
