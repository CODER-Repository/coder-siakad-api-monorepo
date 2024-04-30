ALTER TABLE schedule
ALTER COLUMN nim DROP NOT NULL;
ALTER TABLE schedule DROP CONSTRAINT fk_schedule_student_id;