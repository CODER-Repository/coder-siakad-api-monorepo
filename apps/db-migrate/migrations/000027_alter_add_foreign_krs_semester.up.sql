ALTER TABLE krs
ADD CONSTRAINT fk_krs_semester
FOREIGN KEY (semester_id)
REFERENCES semester (semester_id);