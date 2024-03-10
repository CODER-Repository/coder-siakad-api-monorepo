DROP TABLE IF EXISTS schedule,
             DROP INDEX IF EXISTS schedule_lecturer_idx,
             DROP SEQUENCE IF EXISTS schedule_id_sequence;

DROP TYPE IF EXISTS "day";

ALTER TABLE schedule
    DROP CONSTRAINT IF EXISTS fk_schedule_lecturer_id,
    DROP CONSTRAINT IF EXISTS fk_schedule_course_id,
    DROP CONSTRAINT IF EXISTS fk_ukt_study_program,
    DROP CONSTRAINT IF EXISTS fk_schedule_class_id;
