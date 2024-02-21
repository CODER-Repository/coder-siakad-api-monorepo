CREATE TABLE IF NOT EXISTS super_admin (
    spadmin_id SERIAL PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    user_id UUID
);
