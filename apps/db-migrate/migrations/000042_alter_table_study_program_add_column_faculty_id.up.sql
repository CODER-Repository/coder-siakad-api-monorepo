ALTER TABLE study_program ADD COLUMN faculty_id int4;

ALTER TABLE study_program ADD CONSTRAINT study_program_faculty_id_fkey FOREIGN KEY (faculty_id) REFERENCES faculty(faculty_id);
