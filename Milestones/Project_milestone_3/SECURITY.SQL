
CREATE ROLE user_role;
CREATE ROLE admin_role;

-- Grant SELECT privilege to user_role
/*
In Google Cloud SQL, we can set up "partial revokes." https://cloud.google.com/sql/docs/mysql/flags
Through this system, we can restrict a user/role's ability to interact with different elements in a database
*/
GRANT SELECT ON panopticon.* TO user_role;
REVOKE CREATE, INSERT, UPDATE, DELETE ON panopticon.* FROM user_role;

-- Grant SELECT, INSERT, UPDATE, DELETE privileges to admin_role
GRANT SELECT, INSERT, UPDATE, DELETE ON panopticon.* TO admin_role;
REVOKE CREATE ON panopticon.* FROM admin_role;

GRANT user_role TO 'non_admin'@'34.41.96.81';
GRANT admin_role TO 'admin'@'34.41.96.81';