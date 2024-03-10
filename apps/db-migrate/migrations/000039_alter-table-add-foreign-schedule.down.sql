DROP TABLE IF EXISTS schedule,
    DROP TYPE IF EXISTS "day",
    DROP INDEX IF EXISTS schedule_lecturer_idx,
    DROP SEQUENCE IF EXISTS schedule_id_sequence,
    DROP CONSTRAINT IF EXISTS fk_schedule_lecturer_id,
    DROP CONSTRAINT IF EXISTS fk_schedule_course_id,
    DROP CONSTRAINT IF EXISTS fk_schedule_semester_id,
    DROP CONSTRAINT IF EXISTS fk_schedule_class_id;


