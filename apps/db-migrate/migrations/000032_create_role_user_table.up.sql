CREATE TABLE IF NOT EXISTS role_user (
    role_id varchar(10) NOT NULL,
    user_id uuid NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role(role_id),
    FOREIGN KEY (user_id) REFERENCES "user" (user_id)
)