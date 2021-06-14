
const express= require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
   
res.sendFile(__dirname + "/index.html");

})

app.post("/", function(req, res){
   
    const query = req.body.cityname;
    
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=83a7b4de1837ce6e219697fd5c3ab099&units=metric";

https.get(url, function(response){
    console.log(response.statusCode);


response.on("data", function(data){
   const weatherData=JSON.parse(data);
   const temp=weatherData.main.temp;
    const weatherDescription=weatherData.weather[0].description;
   const icon=weatherData.weather[0].icon;
   const imageUrl= "http://openweathermap.org/img/wn/" + icon + "@2x.png"
    res.write("<h1>The temperature in "+ query +" is " + temp + " degree celcius.</h1>")
   res.write("<p>The weather is currently " + weatherDescription + "</p>");
   res.write("<img src=" + imageUrl +">");
    res.send();
})

})

    console.log("post request received");
});





app.listen(3000, function() {
    console.log("server started on 3000");
})




//const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=83a7b4de1837ce6e219697fd5c3ab099&units=metric";

//https.get(url, function(response){
    //console.log(response.statusCode);


//response.on("data", function(data){
   // const weatherData=JSON.parse(data);
   // const temp=weatherData.main.temp;
    //const weatherDescription=weatherData.weather[0].description;
   // const icon=weatherData.weather[0].icon;
  //  const imageUrl= "http://openweathermap.org/img/wn/" + icon + "@2x.png"
    //res.write("<h1>The temperature in london is " + temp + " degree celcius.</h1>")
 //   res.write("<p>The weather is currently " + weatherDescription + "</p>");
   // res.write("<img src=" + imageUrl +">");
    //res.send();
//})

//})
