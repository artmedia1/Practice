# Secrets Sharing App

## Description

This Node.js web application is a platform where users can register, log in, and share secrets anonymously. It focuses on secure user authentication and session management. The app integrates password salting and hashing with bcryptjs, session management through express-session. It employs PostgreSQL as its database system for storing user information.

![Screenshot of the Application](public/Screenshot1.png)
![Screenshot of the Application](public/Screenshot2.png)

## Prerequisites

- Node.js
- npm (Node Package Manager)
- PostgreSQL

## Installation

To install the project, follow these steps:

1. **Clone the Repository:**

   ```
   git clone https://github.com/artmedia1/Practice.git
   cd The Complete 2023 Web Development Bootcamp/Sections/Section 33 - PostgreSql/33.8 - Family Travel Tracker
   ```

2. **Install Dependencies:**
   ```
   npm install
   ```
3. **Database Setup:**

- Create a PostgreSQL database.
- Obtain your password for the database.
- Configure the `.env` file with your database settings:
  ```
  DATABASE=db_Name
  PASSWORD=db_Password
  ```

4. **Database Schema:**
   The application uses a PostgreSQL database with the following tables:

- **users**: Stores the capital cities of countries.
  - `username`: Primary key, character varying(255)
  - `password`: character varying(255)

5. **Starting the Server:**
   To start the server, run:
   ```
   node app.js
   ```

## Usage
After starting the app, visit http://localhost:3000/ in a web browser. Users must register or log in to view and share secrets. The application showcases simple yet secure login and registration functionalities.

## Features
- Secure User Registration and Login: Hashing passwords with bcryptjs.
- PostgreSQL Database Integration: Storing user credentials and secrets.
- EJS Templating: Rendering dynamic HTML pages for the application.
- Environment Variable Management: Securing database credentials and other sensitive data.