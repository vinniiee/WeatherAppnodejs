const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html");

});
app.post("/", function(req, res) {

const query = req.body.cityName;

const unit = "metric"
const appKey = "145673b1519161888db4ab06e306bdcb"
const url = "https://api.openweathermap.org/data/2.5/weather?&q=" + query + "&units=" + unit + "&appid=" + appKey;

https.get(url, function(response) {

  response.on("data", function(data) {

    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const weather = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const imgurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

    res.write("<h1>The temperature in "+query+" is " + temp + " Degree Celcius</h1>");
    res.write("<h2>Weather is likely to be " + weather + "</h2>");
    res.write("<img src=" + imgurl + ">");
    res.send();

  });

});

// res.send("Server is up and running.");

});

app.listen(3000, function() {
  console.log("Listening at port 3000");
});
