CREATE TABLE IF NOT EXISTS "user" (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100)
);

CREATE INDEX IF NOT EXISTS user_user_id_username_email_idx ON "user" (user_id, username, email);
