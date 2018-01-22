// We'll be rewriting the table's data frequently, so let's make our code more DRY
// by writing a function that takes in 'articles' (JSON) and creates a table body
function displayResults(articles) {
  // First, empty the table
  $("#results").empty();

  // Then, for each entry of that json...
  articles.forEach(function(article) {
    // Append each of the animal's properties to the table
    $("#results").append("<h3>" + article.title + "</h3>" +
                      "<src>" + article.link + "</src>");
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
