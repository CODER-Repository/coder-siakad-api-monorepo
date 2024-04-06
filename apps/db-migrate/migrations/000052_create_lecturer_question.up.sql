CREATE TABLE IF NOT EXISTS lecturer_question (
    id VARCHAR(15) PRIMARY KEY,
    lecturer_questionnaire_id VARCHAR(15) NOT NULL,
    question VARCHAR(255) NOT NULL
);

ALTER TABLE lecturer_question
ADD CONSTRAINT fk_lecturer_question_lecturer_questionnaire_id FOREIGN KEY (lecturer_questionnaire_id) REFERENCES "lecturer_questionnaire" (id) ON DELETE CASCADE ON UPDATE CASCADE;
