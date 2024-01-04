//jshint esversion:6
import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
// import fetch from 'node-fetch';
import pg from "pg";
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

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
app.set('view engine', 'ejs');

app.get("/", async function(req, res) {
    res.render("home");
});

app.get("/login", async function(req, res) {
    res.render("login");
});

app.post("/login", async function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const query = {
        text: 'SELECT email, hashedpassword FROM users WHERE email = $1',
        values: [username],
    };
    
    try {
        const result = await db.query(query);
    
        if (result.rows.length > 0) {
            const hashedPassword = result.rows[0].hashedpassword;
            const isMatch = await bcrypt.compare(password, hashedPassword);
            if (isMatch) {
                console.log("Login success!");
                res.redirect("/secrets");
            } else {
                console.log("Invalid password!");
            }
        } else {
            console.log("No matching user found.");
        }
    } catch (error) {
        console.error("error:", error);
    } 
});

app.get("/register", async function(req, res) {
    res.render("register");
});

app.post("/register", async function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const saltRounds = 13; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const query = {
        text: 'INSERT INTO users(email, hashedpassword) VALUES($1, $2)',
        values: [username, hashedPassword], // Replace 'image_name.jpg' with a dynamic name if needed
      };
  
      try {
        await db.query(query);
        console.log("successful");
        res.redirect("/secrets");
    } catch (error) {
        console.error("error:", error);
    }
});

app.get("/secrets", async function(req, res){
    res.render("secrets");
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
  