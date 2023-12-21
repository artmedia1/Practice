import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from 'dotenv';

// Loading environment variables
dotenv.config();

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: process.env.database,
  password: process.env.password,
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const result = await db.query("SELECT country_code FROM visited_countries");
  let visited_countries = [];
  result.rows.forEach(countries => {
    visited_countries.push(countries.country_code);
  });
  res.render("index.ejs", { countries: visited_countries, total: visited_countries.length })
});

app.get("/error", async (req, res) => {
  const errorMessage = req.query.errorMsg || "An error occurred";

  const result = await db.query("SELECT country_code FROM visited_countries");
  let visited_countries = [];
  result.rows.forEach(country => {
    visited_countries.push(country.country_code);
  });
  console.log(errorMessage);
  res.render("index.ejs", { error: errorMessage, countries: visited_countries, total: visited_countries.length, error: errorMessage });
});


app.post("/add", async (req, res) => {
  const input = req.body.country;
  try {
    // Check if the country exists in the "countries" table
    const query = await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || ($1) || '%';", [input.toLowerCase()]);

    if (query.rows.length === 0) {
      // Country does not exist in the countries table
      res.redirect(`/error?errorMsg=Country not found in database`);
    } else {
      const countryCode = query.rows[0].country_code;
      
      const checkIfVisited = await db.query("SELECT country_code FROM visited_countries WHERE country_code = $1", [countryCode]);
      // Country already exists in visited_countries table
      if(checkIfVisited.rows.length === 1){
        res.redirect(`/error?errorMsg=Country already entered into database`);
      } else {
        await db.query("INSERT INTO visited_countries(country_code) VALUES($1)", [countryCode]);
        res.redirect("/");
      }
    }
  } catch (error) {
    // Handle database errors
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
