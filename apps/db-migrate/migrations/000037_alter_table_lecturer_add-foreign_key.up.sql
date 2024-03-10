ALTER TABLE lecturer
ADD CONSTRAINT a
FOREIGN KEY (user_id)
REFERENCES "user" (user_id);
