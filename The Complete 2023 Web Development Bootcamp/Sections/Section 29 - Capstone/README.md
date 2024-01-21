# Project Title: ClimateQuest

## Introduction

This project is a web application that leverages ChatGPT and other APIs to provide users with real-time weather data and personalized attire recommendations. It's designed to offer an interactive and user-friendly interface for getting weather updates and attire suggestions.

## Prerequisites

Before installing the project, make sure you have the following installed:
- Node.js
- npm (Node Package Manager)

## Installation

To install the project, follow these steps:

1. **Clone the Repository:**
   ```
   git clone [repository URL]
   cd [repository-name]
   ```

2. **Install Dependencies:**
   ```
   npm install
   ```
   
3. **Environment Setup:**
   You will need to obtain the apiKeys from three different website. Then create a .env file placed in the src folder.
	```
	apiKey= Get from https://openweathermap.org/
	unsplashApiKey= Get from https://unsplash.com/
	OPENAI_API_KEY= Get from https://openai.com/
	```
  
4. **Starting the Server:**
	To start the server, run:
   ```
   node index.js
   ```
 
 
## Usage
1. **Access the Web Application:**
Open your web browser and navigate to `http://localhost:[port]` (replace `[port]` with the port number specified in your configuration).

2. **Interact with ChatGPT:**
Use the ChatGPT interface to ask about current weather conditions.

3. **Receive Attire Recommendations:**
Based on the weather data, the application will suggest appropriate attire.

## Acknowledgments
- OpenAI for ChatGPT API.
- Unsplash API for backgrounds
- Openweathermap api for weather information
