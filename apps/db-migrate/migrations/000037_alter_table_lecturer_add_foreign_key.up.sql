ALTER TABLE
    lecturer
ADD
    CONSTRAINT fk_lecturer_user_id FOREIGN KEY (user_id) REFERENCES "user" (user_id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE
    lecturer
ADD
    CONSTRAINT fk_lecturer_email FOREIGN KEY (email) REFERENCES "user" (email) ON DELETE CASCADE ON UPDATE CASCADE;