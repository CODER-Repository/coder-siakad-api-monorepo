CREATE SEQUENCE payment_history_id_seq;

CREATE OR REPLACE FUNCTION generate_payment_history_id()
    RETURNS TEXT LANGUAGE plpgsql AS $$
BEGIN
    RETURN 'PAY' || TO_CHAR(NOW(), 'YYYYDDMMHH24MISS') || LPAD(NEXTVAL('payment_history_id_seq')::TEXT, 4, '0');
END;
$$;

CREATE TYPE payment_status AS ENUM ('pending', 'verified', 'rejected');

CREATE TABLE IF NOT EXISTS payment_history (
    payment_history_id TEXT PRIMARY KEY DEFAULT generate_payment_history_id(),
    invoice_url text,
    ukt_id varchar(15) NOT NULL,
    student_nim varchar(30) NOT NULL,
    amount int8 NOT NULL,
    description text not null,
    payment_date timestamptz NOT NULL default now(),
    payment_verified_at timestamptz,
    payment_method varchar(50) NOT NULL,
    payment_status payment_status NOT NULL,
    proof_of_payment_url text,
    payment_rejected_reason text,
    created_at timestamptz NOT NULL default now(),
    updated_at timestamptz NOT NULL default now()
);