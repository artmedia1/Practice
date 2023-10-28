import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));

// const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var dayType = "weekday";
var advice = "It is time to work hard.";
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(checkDay);
// app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("index.ejs", {
        dayType: dayType,
        advice: advice
    });
});


app.post("/check", (req, res) => {
    if (userIsAuthorised) {
        res.sendFile(__dirname + "/public/secret.html");
    } else {
        res.redirect('/');
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

function checkDay(req, res, next) {
    var date = new Date();
    var today = date.getDay()
    if (today == 0 || today == 6){
        dayType = "the weekend";
        advice = "it is time to have fun!";
    }
    next();
}