CREATE VIEW user_role_view AS
SELECT
    "user".user_id,
    "user".username,
    "user".email,
    role_user.role_id,
    "role".role_name
FROM
    "user"
    INNER JOIN role_user ON "user".user_id = role_user.user_id
    INNER JOIN "role" ON role_user.role_id = "role".role_id;
