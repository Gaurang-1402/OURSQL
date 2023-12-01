
CREATE ROLE user_role;
CREATE ROLE admin_role;
-- Grant SELECT privilege to user_role
GRANT SELECT ON panopticon.USERS TO user_role;

-- Grant SELECT, INSERT, UPDATE, DELETE privileges to admin_role
GRANT SELECT, INSERT, UPDATE, DELETE ON panopticon.USERS TO admin_role;

GRANT user_role TO 'non_admin'@'34.41.96.81';
GRANT admin_role TO 'admin'@'34.41.96.81';