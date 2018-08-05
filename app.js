var express = require("express");
var app = express ();
// var bodyParser = require("body-parser");
var request = require("request");

app.set("view engine", "ejs");

// app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static(__dirname + "/assets"));
app.use(express.static(__dirname + "/public"));

app.get("/", function(req,res) {
    res.render("moviesearch");
})

app.get("/results", function(req, res) {
    var query = req.query.search;
    var year = req.query.y;
    var queryURL = "http://www.omdbapi.com/?s=" + query + "&y=" + year + "&apikey=thewdb";
    request(queryURL, function(error, response, body) {
        var parsedData = JSON.parse(body);
        if(!error && response.statusCode == 200) {
            res.render("results", {results: parsedData});
        } else {
            console.log("SOME ERROR OCURRED!!!");
            console.log(error);
        }
    })
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Movie DB Server started");
})