var mongoose = require("mongoose");
var httpRequest = require("request");

var Movie = require("./models/movie");


mongoose.connect("mongodb://localhost/nodecamp");
var db = mongoose.connection;


db.once("open", function() {
  console.log("MongoDB is connected");

  Movie.remove(function(error) {
    if (error) throw error;

    var url = "https://watcha.net/home/news.json?page=1&per=100";
    httpRequest(url, function(error, httpResponse, body) {
      var data = JSON.parse(body);
      var newsItems = data.news;

      var movies = [];

      newsItems.forEach(function(newsItem) {
        var movie = {
          title: newsItem.title,
          content: newsItem.content,
          image: newsItem.image
        };

        movies.push(movie);
      });

      Movie.collection.insert(movies, function(error, documents) {
        console.log("Movies successfully created");

        db.close(function() {
          console.log("MongoDB is closed");
        });
      });
    });
  });
});
