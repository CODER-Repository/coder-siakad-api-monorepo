CREATE TABLE IF NOT EXISTS address (
    street TEXT,
    city VARCHAR(100),
    zip_code VARCHAR(10),
    country VARCHAR(30),
    nim VARCHAR(30) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS address_nim_idx ON address (nim);
