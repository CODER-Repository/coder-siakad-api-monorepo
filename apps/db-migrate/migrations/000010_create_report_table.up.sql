CREATE TABLE IF NOT EXISTS report (
    report_id SERIAL PRIMARY KEY,
    category_id INT NOT NULL,
    report_name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    feedback TEXT
);
