# Panopticon

![image](https://github.com/Gaurang-1402/OURSQL/assets/71042887/2a67a63f-d520-4bcf-a4ea-be6eb7bc7b2d)


## Project Overview
Our team, **OURSQL**, has built a web-based prison directory, inspired by online staff directories of schools and colleges. The goal is to build a comprehensive internal prisoner directory to assist prison administrators and related parties in managing criminals, crimes, and officers.

### Target Users
- **Primary Users:** Prison administrators
- **Occasional Users:** Officers and other relevant police agencies

### Features
- **Responsive Web App:** Works well in both desktop and mobile layouts.
- **User Operations:** Authenticated users can perform operations like Search/Filter, Read, Create, Update, and Delete on tables.
- **Concurrent Access:** SQL queries are made concurrently to allow multiple users to access the same database.

### User Authentication
- **User Categories:** Admins and Non-admins, with detailed permissions.
- **Registration and Login Pages:** For new and returning users.

### Security
- **Application and Database Security:** Implemented at various levels.

### Fun Fact
**Panopticon** is defined as “a circular prison with cells arranged around a central well, from which prisoners could at all times be observed.”

## Deployment
- **Project URL:** [Panopticon](https://panopticon-6qyi.onrender.com/)

## Database Setup Details
### 2) Database programming
- **Hosting:** MySQL database hosted on Google Cloud Platform.
- **App Deployment Environment:** React app client and Node.js, Express server deployed on OnRender.
- **Concurrent Handling:** Using transactions and async/await syntax for concurrency management in database updates.

## Running the project
Refer to ./package.json, frontend/package.json, and backend/package.json for scripts.

Note: CORS extension required for local runs.

## Security
### User Authentication
- **User Categories:** Admins and Non-admins, with detailed permissions.
- **Registration and Login Pages:** For new and returning users.
- **Application and Database Security:** Implemented at various levels.
- **Database Security at the Database Level:**
  - **Security for Developers and End Users:** Utilizing Google Cloud SQL's built-in security features.
  - **Role-Based Access Control:** Creation of roles like 'user_role' and 'admin_role' with specific privileges.
  - **SQL Commands for Security:** Use of `GRANT` and `REVOKE` to manage privileges.
- **Database Security at the Application Level:**
  - **Backend Route Protection:** JWT web token strategy to secure API requests.
  - **Middleware Check:** To ensure user authentication and admin privileges.
  - **Hashed Passwords:** Secure storage of user passwords.
  - **Role-Based Database Access:** Different credentials for admin and non-admin roles.
- **Frontend Route Protection:** Using global state to manage user access and redirect based on authentication and admin status.
