require("dotenv").config();



var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var fs = require("fs");

var apiSelector = process.argv[2];

var input = process.argv[3];


switch (apiSelector) {
    case "concert-this":
        output = bandsInTownAPI(input);
        break;

    case "spotify-this-song":
        output = spotifyFunction(input);
        break;

    case "movie-this":
        output = omdbAPI(input);
        break;

    // case "do-what-it-says":
    //     output = ;
    //     break;

}

function bandsInTownAPI(input) {
    axios.
        get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp")
        .then(function (response) {
            // console.log(response.data);
            for (var i = 0; i < response.data.length; i++) {
                console.log(
                    "-----------------------------------------------------------" + "\n" +
                    "Band: " + input + "\n" +
                    "Venue: " + response.data[i].venue.name + "\n" +
                    "Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country + "\n" +
                    "Date:" + response.data[i].datetime + "\n"
                );
            }

        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}


function spotifyFunction(input) {
    console.log("Input Received: " + input);
    if (input === undefined) {
        input = "The Sign"
    };


    spotify.search({ type: 'track', query: input, limit: 10 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var songs = data.tracks.items;

        for (var i = 0; i < songs.length; i++) {

            var specificSongBandName = songs[i].artists[0].name;

            if (specificSongBandName === "Ace of Base") {
                console.log(songs[i].artists[0].name);
                console.log(songs[i].name);
                console.log(songs[i].preview_url);
                console.log(songs[i].album.name + "\n");
            }

            // Trying to selectively choose the ace of base only "The Sign options"
            // const array1 = [1, 4, 9, 16];

            // pass a function to map
            // const map1 = array1.map(x => x * 2);

            // console.log(map1);
            // expected output: Array [2, 8, 18, 32]


            console.log("================================================================")
            console.log("Result #" + [i + 1])
            console.log("BAND NAME: " + songs[i].artists[0].name);
            console.log("SONG NAME: " + songs[i].name);
            console.log("PREVIEW VIDEO: " + songs[i].preview_url);
            console.log("ALBUM NAME: " + songs[i].album.name + "\n");
        }

        // console.log(songs[0].album.artists);
        // console.log(songs.name);
        // console.log(songs.preview_url);
        // console.log(songs.album.name);
    });

}



function omdbAPI(input) {
    if (input === undefined) {
        input = "Mr. Nobody"
    };
    console.log("Input Received: " + input);

    axios.get("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {
            console.log("Movie Title: " + response.data.Title);
            console.log("Movie Release Year: " + response.data.Year);
            console.log("IMDb Rating: " + response.data.Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[0].Value);
            console.log("Movie Produced In: " + response.data.Country);
            console.log("Movie Language: " + response.data.Language);
            console.log("Movie Plot: " + response.data.Plot);
            console.log("Prominant Actors: " + response.data.Actors); 
        })

        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            // console.log(error.config);
        });

}












// axios
//     .get("https://api.spotify.com")
//     .then(function (response) {
//         console.log("hello")
//     });
//     .catch (function(error)







// var dotenv = require("dotenv").config();
// var keys = require("./keys.js");




// var spotify = new Spotify(keys.spotify);
// var inputStr = process.argv;
// var command = process.argv[2];
// console.log(command);
