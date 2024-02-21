ALTER TABLE administrator
ADD CONSTRAINT fk_administrator_user_id
FOREIGN KEY (user_id)
REFERENCES "user" (user_id);