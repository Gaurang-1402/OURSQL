# Panopticon

Our team, **OURSQL**, has built a web-based prison directory to enable prison administrators to better manage criminals, crimes, and officers related to the prison. Inspired by online staff directories of schools and colleges, our goal is to build a comprehensive internal prisoner directory to assist in searching, creating, updating, and deleting associated entities.

Active users are expected to be primarily prison administrators, with occasional use by officers and other relevant police agencies investigating related crimes.

We've developed a responsive web app optimized for desktop and mobile layouts, incorporating dynamic behavior through buttons and forms. Access to the database is secured through an authentication mechanism.

Authenticated users can perform the following operations:
- Search/Filter
- Read
- Create
- Update
- Delete

Our SQL queries are made concurrently, allowing multiple users to access the same database and log into our application simultaneously.

We provide a register page for new users and a login page for returning users, categorizing users as admins and non-admins, with clearly defined permissions.

Security measures are implemented at both application and database levels.

**Fun fact**: "Panopticon" is defined as a circular prison with cells arranged around a central well, allowing prisoners to be observed at all times.

**Our project deployed**: [https://panopticon-6qyi.onrender.com/](https://panopticon-6qyi.onrender.com/)

**Code Zip folder**: [Download here](https://drive.google.com/file/d/1iAitG41DT0n746G5y1s8zfT5QlAHvmrj/view?usp=sharing)

**Code Main folder**: [Access here](https://drive.google.com/drive/folders/1Z0Rf6Ec2_ZRXP7TjKEt2Mv42NfI5MF2b?usp=drive_link)

## Database Setup Details

### 2) Database programming

#### a) Hosting
Our MySQL database is hosted on Google Cloud Platform. Connections are made via XAMPP and phpMyAdmin for ease of use.

#### b) App Hosting
Deployed with a React client and Node.js, Express server on [OnRender](https://panopticon-6qyi.onrender.com/). We use Redux for state management and have separated backend logic into routes, controllers, and middleware.

#### c) Deployment Instructions
Nodejs >= v18.04 is required. Environment variables are set in `.env` files in the root and backend folders. Credentials must be handled carefully, and for development, CORS extension is necessary to avoid errors.

Install dependencies with `npm install` in the root, frontend, and backend folders.

Running the project is done through scripts in `package.json` files, with development mode requiring separate terminal instances for the client and server, and production mode is streamlined through build scripts.

#### d) SQL Concurrency
We use transactions for concurrent database writes. Async/await syntax is used for function execution in sequence, and error handling rolls back transactions if needed.

### Security

#### 3) Database Security

##### a) Developer and End-User Security
Security measures are in place for both developers and end-users, leveraging Google Cloud SQL's security features. Users are restricted from creating tables and have specific access based on their role.

##### b) Access Control
Role-based access is controlled through SQL commands, setting privileges for 'user_role' and 'admin_role' with GRANT and REVOKE statements.

##### c) Application Level Security
JWT strategy is used for API requests, with tokens stored in cookies. Middleware checks for user authentication and admin status, and passwords are hashed before storing in the database. User roles dictate database access, ensuring security at the API level.

##### d) Frontend Route Protection
Global state and route wrappers are used to manage access to application pages based on user authentication and admin status.

### Final Schema Statements


criminals(criminal_id, last, first, street, city, state, zip, phone, v_status, p_status)
prob_officer(prob_id, last, first, street, city, state, zip, phone, email, status)
sentences(sentence_id, @criminal_id, @prob_id, type, start_date, end_date, violations)
alias(alias_id, @criminal_id, alias)
crimes(crime_id, @criminal_id, classification, date_charged, status, hearing_date, appeal_cut_date)
crime_codes(crime_code, code_description)
crime_charges(charge_id, @crime_id, @crime_code, charge_status, fine_amount, court_fee, amount_paid, pay_due_date)
appeals(appeal_id, @crime_id, filing_date, hearing_date, status)
officers(officer_id, last, first, precinct, badge, phone, status)
crime_officers(@crime_id, @officer_id)
USERS(user_id, name, email, password, is_admin)
deletion_log(event_id, table_name, deleted_id, delete_time)

