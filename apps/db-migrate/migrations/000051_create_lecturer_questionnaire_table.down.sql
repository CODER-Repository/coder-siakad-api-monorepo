DROP TABLE IF EXISTS lecturer_questionnaire;

ALTER TABLE lecturer_questionnaire DROP CONSTRAINT IF EXISTS fk_lecturer_questionnaire_lecturer_id;
ALTER TABLE lecturer_questionnaire DROP CONSTRAINT IF EXISTS fk_lecturer_questionnaire_semester_id;