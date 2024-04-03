DROP FUNCTION IF EXISTS check_user_role() CASCADE;

DROP TRIGGER IF EXISTS enforce_user_role_constraint ON "student";

DROP TRIGGER IF EXISTS enforce_user_role_constraint ON "lecturer";
