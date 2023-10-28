import express from "express";
import axios from "axios";
import querystring from 'querystring';

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "6jT77a|UNlr:";
const yourPassword = "6jT77a|UNlr:";
var yourAPIKey = "9954623b-34e2-468c-b3be-64f04c4995e2";
const yourBearerToken = "8527a910-04c1-4077-8bbd-5eb2e5868722";

// app.use(getAPIKey);

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  try {
    const result = await axios.get(API_URL + "/random");
    // console.log(result);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
  try {
    const auth = {
      username: yourUsername,
      password: yourPassword
    };
    const result = await axios.get(API_URL + "/random", {auth});
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  try {
    await getAPIKey();
    console.log(yourAPIKey);
    const result = await axios.get(API_URL + "/filter",{
      params: {
        score: 5,
        apiKey: yourAPIKey
      }
    });
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
  const config = {
    headers: { Authorization: `Bearer ${yourBearerToken}` },
  };
  try {
    const result = await axios.get(API_URL + "/secrets/2", config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// async function getAPIKey() {
//   try {
//     const auth = {
//       username: yourUsername,
//       password: yourPassword
//     };
//     const result = await axios.get(API_URL + "/generate-api-key", auth);
//     yourAPIKey = result.data.apiKey;
//   } catch (error) {
//     console.error("Error fetching API key:", error.message);
//     throw error;
//   }
// }

// async function getAuthToken() {
//   try {
//     // Create the request body as x-www-form-urlencoded
//     const requestBody = querystring.stringify({
//       username: yourUsername,
//       password: yourPassword
//     });

//     // Send the POST request with the requestBody and set the Content-Type header
//     const result = await axios.post(API_URL + "/get-auth-token", requestBody, {
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       }
//     });

//     console.log(result.data);
//     // If you want to set the token
//     // yourBearerToken = result.data.token;
    
//   } catch (error) {
//     console.error("Error fetching Auth Token:", error.message);
//     throw error;
//   }
// }
