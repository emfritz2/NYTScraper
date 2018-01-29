
  // display all of the articles

  function displayResults(articles) {
    // First, empty the table
    $("#results").empty();

    // Then, for each entry ...
    articles.forEach(function(article) {

      // Append each of the articles properties to the page
      $("#results").append("<h3>" + article.title + "</h3>" +
                           "<p>" + article.summary + "</p>" +
                           "<a class= 'btn btn-md' role='button' target = '_blank' href= " + article.link + ">" + "Full Article" + "</a>"
                           // + "<button class= 'btn btn-md'" + "Save Article" "</button>"
                            + "<a class= 'btn btn-md save'>" + "Save" + "</a>"
                            + "<a class= 'btn btn-md comment' class='btn btn-primary' data-toggle='modal' data-target='.exampleModal'>" + "Comment" + "</a><hr class='my-4'>"
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
      $("#saved-results").append("<h3>" + article.title + "</h3>" +
                           "<p>" + article.summary + "</p>" +
                           "<a class= 'btn btn-md' role='button' target = '_blank' href= " + article.link + ">" + "Full Article" + "</a>"
                           // + "<button class= 'btn btn-md'" + "Save Article" "</button>"
                            + "<a class= 'btn btn-md remove'" + article.remove + ">" + "Remove" + "</a><hr class='my-4'>"
                           );
    });
  }

  // 1: On Load
  // ==========

  // get the JSON from the backend and render it to the handlebars page

  $.getJSON("/all", function(data) {

    displayResults(data);
  });

  $.getJSON("/save", function(data) {
    displaySaved(data);
  });


  // button commands

  // $(".remove").on("click")



