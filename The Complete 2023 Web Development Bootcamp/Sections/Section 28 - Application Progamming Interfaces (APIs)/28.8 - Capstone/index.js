import express from "express";
import axios from "axios";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import OpenAI from 'openai';

dotenv.config();
const app = express();
const port = 3000;
const API_URL = "http://api.openweathermap.org";
const API_UNSPLASH = "https://api.unsplash.com"
const appid = process.env.apiKey;
const unsplashApiKey = process.env.unsplashApiKey;
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    var backgroundImage = await getBackground();
    if (backgroundImage.error) {
        console.log("Error getting background:", backgroundImage.error);
    } else {
        backgroundImage = backgroundImage.background;
    }
    res.render("index.ejs", { backgroundImage });
});

app.post("/search", async (req, res) => {
    const cityName = req.body.cityName;
    const geoData = await getGeoLocation(cityName);
    var backgroundImage = await getBackground();
    if (backgroundImage.error) {
        console.log("Error getting background:", backgroundImage.error);
    } else {
        backgroundImage = backgroundImage.background;
    }
    if (geoData.hasError) {
        console.log("Error: " + geoData.message);
        res.render("index.ejs", {
            errorMessage: "Location entered is not valid",
            backgroundImage
        });
    } else {
        try {
            const result = await axios.get(API_URL + "/data/2.5/weather", {
                params: {
                    lat: geoData.lat,
                    lon: geoData.lon,
                    appid: appid
                }
            });
            console.log(backgroundImage);
            res.render("index.ejs", {
                temperature: (parseFloat(result.data.main.temp) - 273.15).toFixed(1),
                weather: result.data.weather[0].main,
                icon: result.data.weather[0].icon,
                backgroundImage: backgroundImage,
                city: result.data.name,
                country: result.data.sys.country
            });
            await chatGPTSuggestions();
        } catch (error) {
            let errorMessage;
            if (error.response) {
                errorMessage = error.response.data;
            } else {
                errorMessage = error.message;
            }
            res.render("index.ejs", { error: errorMessage });
        }
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

async function getGeoLocation(cityName) {
    try {
        const result = await axios.get(API_URL + "/geo/1.0/direct", {
            params: {
                q: cityName,
                limit: 1,
                appid: appid
            }
        });
        return {
            hasError: false,
            lat: result.data[0].lat,
            lon: result.data[0].lon
        };
    } catch (error) {
        let errorMessage;
        if (error.response) {
            errorMessage = error.response.data;
        } else {
            errorMessage = error.message;
        }
        return {
            hasError: true,
            message: errorMessage
        };
    }
}

async function getBackground() {
    try {
        const result = await axios.get(API_UNSPLASH + "/photos/random", {
            params: {
                query: "nature landscapes",
                count: 1,
                client_id: unsplashApiKey,
                orientation: "landscape"
            }
        });
        const link = result.data[0].urls.raw;
        return {
            background: link
        };
    } catch (error) {
        let errorMessage;
        if (error.response) {
            errorMessage = error.response.data;
        } else {
            errorMessage = error.message;
        }
        return {
            error: errorMessage,
            background: "/images/background.jpg"
        };
    }
}

async function chatGPTSuggestions() { //add options such as activity types, i.e. outdoors
    const suggestedActivities = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: "list some activities in sunny 23 degree celcius weather in Toronto.",
        max_tokens: 30,
        temperature: 0,
    });

    const suggestedAttire = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: "Tell me what to wear  in sunny 23 degree celcius weather.",
        max_tokens: 30,
        temperature: 0,
    });
    // console.log(completion);
    // console.log(completion.choices[0]);
    var activities = suggestedActivities.choices[0].text;
    // console.log(completion.choices[0].text);
    activities = activities.split('\n').filter(item => item.trim() !== '').map(item => item.split('. ')[1]);
    console.log(activities);
}

