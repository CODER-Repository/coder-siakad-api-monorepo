ALTER TABLE ukt
ADD CONSTRAINT fk_ukt_study_program
FOREIGN KEY (study_program_id)
REFERENCES study_program (study_program_id)
ON DELETE CASCADE ON UPDATE CASCADE;