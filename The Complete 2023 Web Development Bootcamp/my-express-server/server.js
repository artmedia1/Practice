import express from 'express';

const app = express();

app.get("/", function(req, res){
    res.send("<h1>Hello World!</h1>");
});

app.get("/contact", function(req, res){
    res.send("Contact me at: Lorum Ipsum");
})

app.get("/about", function(req, res){
    res.send("I am a Computer Engineering Student at York University");
})

app.listen(3000, function(){
    console.log("Server has started on port 3000");
});




