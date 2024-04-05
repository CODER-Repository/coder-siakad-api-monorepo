CREATE TABLE IF NOT EXISTS lecturer_questionnaire (
    id VARCHAR(15) PRIMARY KEY,
    lecturer_id uuid NOT NULL,
    semester_id VARCHAR(15) NOT NULL,
)

ALTER TABLE lecturer_questionnaire
ADD CONSTRAINT fk_lecturer_questionnaire_lecturer_id FOREIGN KEY (lecturer_id) REFERENCES "lecturer" (nip) ON DELETE CASCADE ON UPDATE CASCADE;
ADD CONSTRAINT fk_lecturer_questionnaire_semester_id FOREIGN KEY (semester_id) REFERENCES "semester" (semester_id) ON DELETE CASCADE ON UPDATE CASCADE;
