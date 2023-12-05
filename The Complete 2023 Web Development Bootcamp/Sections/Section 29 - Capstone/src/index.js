// Importing necessary modules and libraries
import express, { query } from "express";
import axios from "axios";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import OpenAI from 'openai';
import serverless from "serverless-http";

// Loading environment variables
dotenv.config();

// Initializing the Express application
const app = express();
const port = 3000;

// Setting API base URLs for OpenWeatherMap and Unsplash
const API_URL = "http://api.openweathermap.org";
const API_UNSPLASH = "https://api.unsplash.com"

// Retrieving API keys from environment variables
const appid = process.env.apiKey;
const unsplashApiKey = process.env.unsplashApiKey;

// Initializing OpenAI with the API key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Configuring middleware to serve static files and parse request bodies
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Handling GET requests to '/search' endpoint
app.get("/search", async (req, res) => {
    var backgroundImage = await getBackground();
    if (backgroundImage.error) {
        console.log("Error getting background:", backgroundImage.error);
    } else {
        backgroundImage = backgroundImage.background;
    }
    res.render("index.ejs", { backgroundImage });
});

// Handling POST requests to '/search' endpoint
app.post("/search", async (req, res) => {
    const cityName = req.body.cityName;
    const geoData = await getGeoLocation(cityName);
    var background = await getBackground(cityName);
    if (background.error) {
        console.log("Error getting background:", background.error);
    }
    const backgroundImage = background.background;
    // console.log(backgroundImage);
    if (geoData.hasError) {
        console.log("Error: " + geoData.message);
        res.render("index.ejs", {
            errorMessage: "Location entered is not valid",
            backgroundImage
        });
    } else {
        try {
            // Fetching weather data using OpenWeatherMap API
            const result = await axios.get(API_URL + "/data/2.5/weather", {
                params: {
                    lat: geoData.lat,
                    lon: geoData.lon,
                    appid: appid
                }
            });
            // Processing weather data
            const weather = {
                temperature: (parseFloat(result.data.main.temp) - 273.15).toFixed(1),
                weather: result.data.weather[0].main,
                icon: result.data.weather[0].icon,
                city: result.data.name,
                country: result.data.sys.country
            }
            // Getting activity and attire suggestions using OpenAI
            const suggestions = await chatGPTSuggestions(weather.weather, weather.temperature, weather.city, weather.country);
            // Rendering the page with weather data and suggestions
            res.render("index.ejs", { backgroundImage, weather, suggestions });
        } catch (error) {
            // Handling errors during API call
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

// Function to get geolocation data from OpenWeatherMap API
async function getGeoLocation(cityName) {
    try {
        const result = await axios.get(API_URL + "/geo/1.0/direct", {
            params: {
                q: cityName,
                limit: 1,
                appid: appid
            }
        });
        // console.log("Geolocation - Done");
        return {
            hasError: false,
            lat: result.data[0].lat,
            lon: result.data[0].lon
        };
    } catch (error) {
        // Handling errors during geolocation fetch
        let errorMessage;
        if (error.response) {
            errorMessage = error.response.data;
        } else {
            errorMessage = error.message;
        }
        // console.log("Geolocation - Done");
        return {
            hasError: true,
            message: errorMessage
        };
    }
}

// Function to get a random background image from Unsplash
async function getBackground(cityName) {
    try {
        var result = "";
        var link = "";
        if (cityName) {
            var imageQuery = cityName + " cityscape";
            console.log(imageQuery);
            result = await axios.get(API_UNSPLASH + "/search/photos", {          
                params: {
                    query: imageQuery,
                    per_page: 1,
                    page: 1,
                    client_id: unsplashApiKey,
                    orientation: "landscape",
                }
            });
            console.log(result.data.results[0].urls.raw);
            link = result.data.results[0].urls.raw;
        } else {
            result = await axios.get(API_UNSPLASH + "/photos/random", {
                params: {
                    query: "nature landscapes",
                    count: 1,
                    client_id: unsplashApiKey,
                    orientation: "landscape"
                }
            });
            console.log(result);
            link = result.data[0].urls.raw;
        }

        // console.log("Background - Done");
        return {
            background: link
        };
    } catch (error) {
        // Handling errors during background image fetch
        let errorMessage;
        if (error.response) {
            errorMessage = error.response.data;
        } else {
            errorMessage = error.message;
        }
        // console.log("Background - Done");
        return {
            error: errorMessage,
            background: "../images/background.jpg"
        };
    }
}

// Function to generate activity and attire suggestions using OpenAI
async function chatGPTSuggestions(weather, temperature, city, country) {
    var prompt = `list me 5 activities to do and the location in ${weather} ${temperature} degree Celsius in ${city}, ${country} and suggest an attire, the format is "activity: attire" I want just the list, I do not want details for the attire`;
    const suggestions = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: prompt,
        max_tokens: 150
    });

    // Processing the response to extract activities and attires
    const splitActivityAndAttire = (line) => {
        const [, , activity, attire] = line.match(/(\d+\.\s)(.+?):\s(.+)/) || [];
        return { activity, attire };
    }

    const extractActivitiesAndAttires = (text) => {
        return text
            .split('\n')
            .filter(line => line.trim() !== '' && line.includes(':'))
            .map(splitActivityAndAttire);
    }

    const text = suggestions.choices[0].text;
    const result = extractActivitiesAndAttires(text);
    // console.log("Chat - Done");
    return result;
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


// Exporting the handler for serverless deployment
export const handler = serverless(app);
