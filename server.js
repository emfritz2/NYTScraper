// Dependencies
var express = require("express");
var mongojs = require("mongojs");
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");
var exphbs  = require('express-handlebars');

// Initialize Express
var app = express();

// handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// require the public folder
app.use(express.static("public"));

// Database configuration
var databaseUrl = "nyt-db";
var collections = ["scrapedData", "saved"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Retrieve the most recent articles from the db and display
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

});


// retrieve all of the saved articles

app.get("/saved", function(req, res) {
  // Find all results from the saved collection
  db.saved.find({}, function(error, savedArticles) {
    // Throw any errors to the console
    if (error) {
      console.log(error);
    }
    // If there are no errors, send the data to the browser as json
    else {
      res.render('saved.handlebars');
    }
  });

});

// retrieve homepage

app.get("/", function(req, res) {

  db.scrapedData.find({}, function(error, found) {

    if (error) {
      console.log(error);
    }
    else { //if no cookies are found, send user to homepage
        res.render('index.handlebars');
    };

request("https://www.nytimes.com/", function(error, response, html) {
    // Load the html body from request into cheerio
    var $ = cheerio.load(html);
    // For each element with a "title" class
    $("h2.story-heading").each(function(i, element) {
      // Save the text and href of each link enclosed in the current element
      var title = $(element).children("a").text();
      var summary = $(element).children("a").text();
      var link = $(element).children("a").attr("href");
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
  });

  
  });
});


// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
