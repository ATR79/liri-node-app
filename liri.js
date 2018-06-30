//import keys.js
var keys = require("./keys.js");

//created a separate file that I could not get to work
//var OMDB = require("./movie.js");

//reguire npm packages
require("dotenv").config();
var request = require("request");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");

//access specific keys
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//'my-tweets' NOT WORKING - I tried changing API keys, using the keys slacked, made sure my screen-name is correct, but it's not working
var userCommand = process.argv[2];

if (userCommand === "my-tweets") {
    var myTweets = {screen_name: "Existentialismy"};
}

//var twitter = function () {
    var params = {
        screen_name: 'Existentialismy',
        count: 20
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log(tweets);
        } else {
            for (var i = 0; i < tweets.length; i++) {
                console.lot(tweets[i].text);
            }
        }
    });
;

//'movie-this'
var Movie = function () {
    this.optionMatcher = function (movieName) {
        var URL = "http://www.omdbapi.com/?apikey=eaecc1d7&" + movieName;

        request(URL, function (err, response, body) {
            var jsonData = JSON.parse(body);

            var movieData = [
                "Title: " + jsonData.Title,
                "Year: " + jsonData.Year,
                "IMDB Rated: " + jsonData.Rated,
                //"Rotten Tomatoes Rated: " + jsonData.Ratings[1].Value,
                "Country: " + jsonData.Country,
                "Language: " + jsonData.Language,
                "Plot: " + jsonData.Plot,
                "Actors: " + jsonData.Actors
            ].join("\n\n");

            if (err) throw err;

            if (!err && response.statusCode === 200) {
                console.log(movieData);
            }
        })
    }
}
//'spotify-this-song'
var mySpotify = function(songName) {
spotify.search({ type: 'track', query: songName }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 
    console.log(data.tracks.items[0]);
});
}


var choose = function(caseData, functionData) {
switch (caseData) {
    case 'my-tweets':
        console.log("twitter");
        break;
        case 'spotify-this-song':
        mySpotify(functionData);
        break;
    default:
        console.log("I don't understand.");
    }
}

//attempted to learn switchback command with tutor
// var command = process.argv[2];
// switch(command) {
//     case "spotify":
//     console.log("spotify");
//     break;

//     case "twitter":
//     console.log("twitter");
//     break;

//     case "OMDB":
//     console.log("OMDB");
//     OMDB(process.argv[3]) 
//     break;

//     default:
//     console.log("I don't understand.");
// }