// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var request = require("request");
var cheerio = require("cheerio");
var exphbs  = require('express-handlebars');
var mongoose = require("mongoose");

var port = process.env.PORT || 3000;

// Initialize Express
var app = express();

// handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// require the public folder
app.use(express.static("public"));

// Database configuration
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/nyt-db";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

var databaseUrl = "nyt-db";
var collections = ["scrapedData", "saved"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Retrieve the most recent articles from the db
app.get("/all", function(req, res) {

  // Find all results from the scrapedData collection in the db
  db.scrapedData.find({}, function(error, found) {
    // Throw any errors to the console
    if (error) {
      console.log(error);
    }
    // If there are no errors, send the data to the browser as json
    else {
      res.json(found);
    }
  });
    Scraped();
});

<<<<<<< HEAD
// retrieve homepage
app.get("/", function(req, res) {

        res.render('home.handlebars');

});


// retrieve all of the saved articles

app.get("/saved", function(req, res) {
  // Find all results from the saved collection
  db.saved.find({}, function(error, found) {
=======
// Retrieve the saved articles from the db
app.get("/save", function(req, res) {
  // Find all results from the scrapedData collection in the db
  db.saved.find({}, function(error, found) {
    // Throw any errors to the console
>>>>>>> 67e4db3b7c1350b5ad1ef1e2989aa665bfacd7a5
    if (error) {
      console.log(error);
    }
    else {
      res.json(found);
    }
  });

});

<<<<<<< HEAD
=======

// retrieve all of the saved articles

app.get("/saved", function(req, res) {

      res.render('saved.handlebars');

    });

// retrieve homepage

app.get("/", function(req, res) {

        res.render('home.handlebars');

});

>>>>>>> 67e4db3b7c1350b5ad1ef1e2989aa665bfacd7a5

app.get("/articles", function(req, res) {
  
  res.render('index.handlebars');

});

<<<<<<< HEAD
request("https://www.nytimes.com/section/world", function(error, response, html) {
    // Load the html body from request into cheerio
    var $ = cheerio.load(html);
    // For each element with a "title" class
    $("div.story-body").each(function(i, element) {
      // Save the text and href of each link enclosed in the current element
      var title = $(element).find("h2.headline").text().trim();
      var summary = $(element).find("p.summary").text().trim();
      var link = $(element).find("a").attr("href");
      var saved = false;

      // If this found element had both a title and a link
      if (title && summary && link) {
        // Insert the data in the scrapedData db
        db.scrapedData.insert({
          title: title,
          summary: summary,
          link: link,
          saved: saved
        },
        function(err, inserted) {
          if (err) {
            // Log the error if one is encountered during the query
            console.log(err);
          }
          else {
            // Otherwise, log the inserted data
            console.log(inserted);
          }
          res.render('index.handlebars');
        });
      }
=======
// scraping function

function Scraped(){

  app.get("/scraped", function (req, res) {

  request("https://www.nytimes.com/section/us", function(error, response, html) {
      // Load the html body from request into cheerio
      var $ = cheerio.load(html);
      // For each element with a "title" class
      $("div.story-body").each(function(i, element) {
        // Save the text and href of each link enclosed in the current element
        var title = $(element).find("h2.headline").text().trim();
        var summary = $(element).find("p.summary").text().trim();
        var link = $(element).find("a").attr("href");
        var saved = false;

        // If this found element had both a title and a link
        if (title && summary && link) {
          // Insert the data in the scrapedData db
          db.scrapedData.insert({
            title: title,
            summary: summary,
            link: link,
            saved: saved
          },
          function(err, inserted) {
            if (err) {
              // Log the error if one is encountered during the query
              console.log(err);
            }
            else {
              // Otherwise, log the inserted data
              console.log(inserted);
             
            }
          });
        }
      });
>>>>>>> 67e4db3b7c1350b5ad1ef1e2989aa665bfacd7a5
    });
  });
};

// Listen on port 3000
app.listen(port, function() {
  console.log("App running on port " + port);
});
