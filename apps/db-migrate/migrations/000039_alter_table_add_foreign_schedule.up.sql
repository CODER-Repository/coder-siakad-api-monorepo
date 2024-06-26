ALTER TABLE schedule
    ADD CONSTRAINT fk_schedule_lecturer_id FOREIGN KEY (lecturer_id) REFERENCES lecturer (nip) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT fk_schedule_course_id FOREIGN KEY (course_id) REFERENCES course (course_id) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT fk_schedule_class_id FOREIGN KEY (class_id) REFERENCES class (class_id) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT fk_schedule_semester_id FOREIGN KEY (semester_id) REFERENCES semester (semester_id) ON DELETE CASCADE ON UPDATE CASCADE;
