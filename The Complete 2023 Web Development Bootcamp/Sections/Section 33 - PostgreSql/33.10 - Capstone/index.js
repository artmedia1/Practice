import express from "express";
import bodyParser from "body-parser";
import fetch from 'node-fetch';
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

app.set('view engine', 'ejs'); // Set EJS as the view engine

app.get('/', async (req, res) => {
  try {
    const query = 'SELECT * FROM animes LIMIT 1'; // Adjust as needed
    const result = await db.query(query);

    if (result.rows.length > 0) {
      const anime = result.rows[0];
      const buffer = Buffer.from(anime.image); // Convert bytea to a Buffer object
      const convertedImage = buffer.toString('base64'); // Convert the buffer to a Base64 string

      // Pass the Base64 string to the template
      res.render('index', { 
        image: `data:image/jpeg;base64,${convertedImage}`, // Assume JPEG format
        name: anime.name // Assuming there is a name field
      });
    } else {
      res.render('index', { image: null, name: '' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving image');
  }
});

app.get('/test', async (req, res) => {
  const imageUrl = 'https://cdn.myanimelist.net/images/anime/4/78280l.jpg'; // Replace with a dynamic URL if needed
  try {
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer(); // Make sure to call arrayBuffer as a function
    const buffer = Buffer.from(arrayBuffer); // Convert the ArrayBuffer to a Node.js Buffer

    const query = {
      text: 'INSERT INTO animes(name, image, mal_id) VALUES($1, $2, $3)',
      values: ['image_name.jpg', buffer, 28755], // Replace 'image_name.jpg' with a dynamic name if needed
    };

    await db.query(query); // Use 'db' instead of 'pool'
    res.send('Image uploaded successfully.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error uploading image');
  }
});

const password = "userPassword"; 
const saltRounds = 13; 

// Hashing the password
const hash = await bcrypt.hash(password, saltRounds);
console.log("Hashed Password:", hash);

// const query = {
//   text: 'INSERT INTO animes(name) VALUES($1)',
//   values: [hash], 
// };
// await db.query(query); 

const query = {
  text: 'SELECT name FROM animes WHERE id = 3'
};
const request = await db.query(query); 
const storedHash = request.rows[0].name
console.log(storedHash);

// // Checking the password
const inputPassword = "userPassword"; // Password from a login attempt
const isMatch = await bcrypt.compare(inputPassword, storedHash);

if (isMatch) {
    console.log("Login success!");
} else {
    console.log("Invalid password!");
}

    
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});