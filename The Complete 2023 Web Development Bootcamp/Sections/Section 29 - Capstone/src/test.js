import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

async function main() {
    const completion = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: "list some activities in sunny 23 degree celcius weahterm just give me a list of activities and nothing else.",
      max_tokens: 30,
      temperature: 0,
    });
  
    console.log(completion);
  }
  main();