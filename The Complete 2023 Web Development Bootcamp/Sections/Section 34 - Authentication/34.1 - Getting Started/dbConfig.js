import pg from 'pg';
import dotenv from 'dotenv';
import Sequelize from "sequelize";

dotenv.config();

const sequelize = new Sequelize(
  process.env.database,
  "postgres",
  process.env.password,
  {
    host: "localhost",
    dialect: 'postgres' // Specify the dialect
  }
  );

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: process.env.database,
    password: process.env.password,
    port: 5432,
  });

// Connect to the database
const connectDB = async () => {
  try {
    await db.connect();
    console.log('Connected to the PostgreSQL database');
  } catch (err) {
    console.error('Connection error', err.stack);
  }
};

const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// Export the db client and the connection function
export { db, connectDB, sequelize };