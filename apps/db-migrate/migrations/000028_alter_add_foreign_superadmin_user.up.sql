ALTER TABLE super_admin
ADD CONSTRAINT fk_superadmin_user
FOREIGN KEY (user_id)
REFERENCES "user" (user_id);