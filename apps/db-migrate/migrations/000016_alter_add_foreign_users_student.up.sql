ALTER TABLE student
ADD CONSTRAINT fk_student_user_id
FOREIGN KEY (user_id)
REFERENCES "user" (user_id);