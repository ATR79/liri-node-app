//var request = require("request");

// //'movie-this'
// var Movie = function () {
//     this.optionMatcher = function (movieName) {
//         var URL = "http://www.omdbapi.com/?apikey=eaecc1d7&" + movieName;

//         request(URL, function (err, response, body) {
//             var jsonData = JSON.parse(body);

//             var movieData = [
//                 "Title: " + jsonData.Title,
//                 "Year: " + jsonData.Year,
//                 "IMDB Rated: " + jsonData.Rated,
//                 //"Rotten Tomatoes Rated: " + jsonData.Ratings[1].Value,
//                 "Country: " + jsonData.Country,
//                 "Language: " + jsonData.Language,
//                 "Plot: " + jsonData.Plot,
//                 "Actors: " + jsonData.Actors
//             ].join("\n\n");

//             if(err) throw err;

//             if (!err && response.statusCode === 200) {
//                 console.log(movieData);
//             }
//         })
//     }
// }
// module.exports = Movie;
