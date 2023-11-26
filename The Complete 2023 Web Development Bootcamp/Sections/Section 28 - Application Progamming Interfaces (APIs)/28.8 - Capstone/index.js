import express from "express";
import axios from "axios";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import OpenAI from 'openai';
import serverless from "serverless-http";

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

app.get("/search", async (req, res) => {
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
    var background = await getBackground();
    // console.log(backgroundImage);
    if (background.error) {
        console.log("Error getting background:", background.error);
    }
    const backgroundImage = background.background;
    console.log(backgroundImage);
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
            const weather = {
                temperature: (parseFloat(result.data.main.temp) - 273.15).toFixed(1),
                weather: result.data.weather[0].main,
                icon: result.data.weather[0].icon,
                city: result.data.name,
                country: result.data.sys.country
            }
            const suggestions = await chatGPTSuggestions(weather.weather, weather.temperature, weather.city, weather.country);
            res.render("index.ejs", {backgroundImage, weather, suggestions});
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
        console.log(result.data[0].user.username);
        console.log(result.data[0].user.portfolio_url);
        console.log(result.data[0].user.links.html);
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

async function chatGPTSuggestions(weather, temperature, city, country) { //add options such as activity types, i.e. outdoors
    var prompt = `list me 5 activities to do and the location in ${weather} ${temperature} degree celcius in ${city}, ${country} and suggest an attire, the format is "activity: attire" I want just the list, I do not want details for the attire`;
    const suggestions = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: prompt,
        max_tokens: 150,
    });

    const splitActivityAndAttire = (line) => {
        const [ , , activity, attire] = line.match(/(\d+\.\s)(.+?):\s(.+)/) || [];
        return { activity, attire };
    }
    
    const extractActivitiesAndAttires = (text) => {
        return text
            .split('\n')
            .filter(line => line.trim() !== '' && line.includes(':'))
            .map(splitActivityAndAttire);
    }

    // console.log(suggestions);
    // console.log(completion.choices[0]);
    const text = suggestions.choices[0].text;
    const result = extractActivitiesAndAttires(text);
    // console.log(result);
    return result;

}

// export const handler = serverless(app);