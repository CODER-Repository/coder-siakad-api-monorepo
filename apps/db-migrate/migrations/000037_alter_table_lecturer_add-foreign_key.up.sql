ALTER TABLE lecturer
ADD CONSTRAINT fk_lecturer_user_id
FOREIGN KEY (user_id)
REFERENCES "user" (user_id);
