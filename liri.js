var apiSelector = process.argv[2];
var input = process.argv[3];

var axios = require("axios");


switch (apiSelector) {
    case "concert-this":
        output = bandsInTownAPI(input);
        break;

    // case "spotify-this-song":
    //     output = ;
    //     break;

    // case "movie-this":
    //     output = ;
    //     break;

    // case "do-what-it-says":
    //     output = ;
    //     break;

}

function bandsInTownAPI(input) {
    axios.
        get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp")
        .then(function (response) {
            // console.log(response.data);
            console.log(
                "Band: " + input + "\n" +
                "Venue: " + response.data[0].venue.name + "\n" +
                "Location: " + response.data[0].venue.city + ", " + response.data[0].venue.country + "\n" +
                "Date:" +  response.data[0].datetime
            );
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

















// axios
//     .get("https://api.spotify.com")
//     .then(function (response) {
//         console.log("hello")
//     });
//     .catch (function(error)







// var dotenv = require("dotenv").config();
// var keys = require("./keys.js");
// var spotify = require('node-spotify-api');



// var spotify = new Spotify(keys.spotify);
// var inputStr = process.argv;
// var command = process.argv[2];
// console.log(command);
