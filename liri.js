
require("dotenv").config();
//import keys.js
var keys = require("./keys.js");

//created a separate file that I could not get to work
//var OMDB = require("./movie.js");

//reguire npm packages

var request = require("request");
//var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var fs = require("fs");
var input = process.argv;
var command = input[2];
var action = input[3];

//access specific keys
//var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
console.log(keys.twitter);
//attempted to learn switchback command with tutor
switch (command) {
    case "my-tweets":
        runTwitter();
        break;

    case "spotify-this-song":
        console.log(action);
        break;

    case "movie-this":
        console.log(action);
        break;

    case "do-what-it-says":
        doWhatitSays();
        break;

    default:
        console.log("I don't know this.");
};


//'my-tweets' NOT WORKING - I tried changing API keys, using the keys slacked, made sure my screen-name is correct, but it's not working

function runTwitter() {
    console.log('twitter was called');
    var params = {
        screen_name: 'Existentialismy',
        action,
        count: 20
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
            }
        } else {
            console.log(error);
        }
    })
};

//'movie-this'
function movie(action) {
    var URL = "http://www.omdbapi.com/?t=" + action + "&y=&plot=short&apikey=eaecc1d7&";

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
};

//'spotify-this-song'
function runSpotify(action) {
    if (!action) {
        action = 'I want it that way';
    }
    // spotify.search({
    //     type: 'track',
    //     query: action
    // }, function (err, data) {
    //     if (err) {
    //         console.log('Error occurred: ' + err);
    //         return;
    //     }

    //     var songData = data.tracks.items;
    //     console.log("Artist: " + songData[0].artists[0].name);
    //     console.log("Song Name: " + songData[0].name);
    //     console.log("Preview Link: " + songData[0].preview_url);
    //     console.log("Album: " + songData[0].ablum.name);
    // });
};

//do-what-it-says
function doWhatitSays() {
    fs.readFile('random.txt', function (err, data) {
        if (err) {
            console.log(err);
        }
    })

    var dataArr = data.split(",");

    if (dataArr[0] === "spotify-this-song") {
        var song = dataArr[1].slice(1, -1);
        Spotify(song);
    } else if (dataArr[0] === "my-tweets") {
        var myTweet = dataArr[1].slice(1, -1);
        Twitter(myTweet);
    } else if (dataArr[0] === "movie-this") {
        var myMovie = dataArr[1].slice(1, -1);
        movie(myMovie);
    };
};


// var choose = function(caseData, functionData) {
// switch (caseData) {
//     case 'my-tweets':
//         console.log("twitter");
//         break;
//         case 'spotify-this-song':
//         mySpotify(functionData);
//         break;
//     default:
//         console.log("I don't understand.");
//     }
// }