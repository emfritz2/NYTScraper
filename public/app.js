
// display all of the articles

function displayResults(articles) {
  // First, empty the table
  $("#results").empty();

  // Then, for each entry ...
  articles.forEach(function(article) {

    // Append each of the articles properties to the page
    $("#results").append("<h3>" + article.title + "</h3>" +
                         // "<p>" + article.summary + "</p>" +
                         "<a class= 'btn btn-md' role='button' target = '_blank' href= " + article.link + ">" + "Full Article" + "</a>"
                         // + "<button class= 'btn btn-md'" + "Save Article" "</button>"
                          + "<a class= 'btn btn-md' id='save'" + article.saved + ">" + "Save" + "</a><hr class='my-4'>"
                         );
  });
}

// display all of the saved articles

function displaySaved(articles) {
  // First, empty the table
  $("#saved-results").empty();

  // Then, for each entry ...
  articles.forEach(function(article) {

    // Append each of the articles properties to the page
    $("#saved-results").append("<h3>" + saved.title + "</h3>" +
                         // "<p>" + article.summary + "</p>" +
                         "<a class= 'btn btn-md' role='button' target = '_blank' href= " + saved.link + ">" + "Full Article" + "</a>"
                         // + "<button class= 'btn btn-md'" + "Save Article" "</button>"
                          + "<a class= 'btn btn-md' id='remove'" + saved.remove + ">" + "Remove" + "</a><hr class='my-4'>"
                         );
  });
}

// 1: On Load
// ==========

// First thing: ask the back end for json with all articles
$.getJSON("/all", function(data) {
  // Call our function to generate a table body
  displayResults(data);
});

// 2: Button Interactions
// ======================

// When user clicks the scrape sort button, display articles
$("#scrape").on("click", function() {

  // Do an api call to the back end for json
  $.getJSON("/all", function(data) {

    // Call our function to generate a table body
    displayResults(data);
  });
});

// When user clicks the saved button, display saved articles
$("#save").on("click", function() {

  // Do an api call to the back end for json
  $.getJSON("/saved", function(data) {

    // Call our function to generate a table body
    displaySaved(data);
  });
});
