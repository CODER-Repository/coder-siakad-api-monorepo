ALTER TABLE krs
ADD CONSTRAINT fk_krs_nim
FOREIGN KEY (nim)
REFERENCES student (nim);