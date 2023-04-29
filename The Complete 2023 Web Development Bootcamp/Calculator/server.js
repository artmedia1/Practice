import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bodyParser from "body-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(request, response){
    response.sendFile(__dirname + "/index.html");
});

app.post("/", function(request, response){
    var num1 = Number(request.body.num1);
    var num2 = Number(request.body.num2);
    var result = num1 + num2;
    
    response.send("The result is " + result);
})

app.get("/bmicalculator", function(request, response){
    response.sendFile(__dirname + "/bmicalculator.html");
});

app.post("/bmicalculator", function(request, response){
    var weight = parseFloat(request.body.weight);
    var height = parseFloat(request.body.height);
    var result = weight / (height ** 2);
    result = result.toFixed(2);
    
    response.send("The BMI is " + result);
})

app.listen(3000, function(){
    console.log("Server has started on port 3000");
});