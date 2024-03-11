ALTER TABLE payment_history
    DROP CONSTRAINT IF EXISTS fk_nim_payment_history,
    DROP CONSTRAINT IF EXISTS fk_ukt_payment_history
