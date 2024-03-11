ALTER TABLE schedule DROP CONSTRAINT IF EXISTS fk_schedule_lecturer_id;
ALTER TABLE schedule DROP CONSTRAINT IF EXISTS fk_schedule_course_id;
ALTER TABLE schedule DROP CONSTRAINT IF EXISTS fk_schedule_class_id;
ALTER TABLE schedule DROP CONSTRAINT IF EXISTS fk_schedule_semester_id;
