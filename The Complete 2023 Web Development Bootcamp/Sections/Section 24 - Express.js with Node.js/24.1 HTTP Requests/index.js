import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from 'url';
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url); //Gets path of this file
const __dirname = dirname(__filename); //Gets the directory of the above path

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});


// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, '/Templates/index.html'));
// });

app.get("/about", (req, res) => {
    //console.log(req.rawHeaders);
    res.send("<h1>My name is Randy</h1>")
})

app.get("/contact", (req, res) => {
    //console.log(req.rawHeaders);
    res.send("<h1>You can contact me</h1>")
})

app.get("/upload-page", (req, res) => {
    //console.log(req.rawHeaders);
    res.render('upload');
})

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});