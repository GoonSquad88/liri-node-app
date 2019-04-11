require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");

var readTheFile = function () {


  fs.readFile("random.txt", "utf8", function (err, data) {
    if (err) throw err;
    console.log(data);
    var textArr = data.split(",");

    if (textArr == 2) {
      liriLogic(textArr[0], textArr[1]);
    } else if (textArr == 1) {
      liriLogic(textArr[0]);
    }
  });
};

var spotify = new Spotify(keys.spotify);

var getBand = function (artist) {

  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    .then(function (response) {
      
      for (i=0; i<response.data.length; i++) {
      var date = moment(response.data[i].datetime); 
      
      console.log(i);
      console.log("Name of venue: " + response.data[i].venue.name);
      console.log("Venue location: " + response.data[i].venue.country);
      console.log("Date: " + date.format("LLL"));
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}




var getMovie = function (movieTitle) {

  axios.get("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy")
    .then(function (response) {
      //console.log(response.data);
      console.log("Title: " + response.data.Title);
      console.log("Year: " + response.data.Year);
      console.log("imdbRating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes rating: " + response.data.Ratings[1].Value);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
    })
    .catch(function (error) {
      console.log(error);
    });
}




var displayArtistName = function (artist) {
  return artist.name;
};

var getSpotify = function (userSong) {
  spotify.search({ type: 'track', query: userSong }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    var song = data.tracks.items;
    

    for (i = 0; i < song.length; i++) {
      console.log(i);
      console.log("Artist(s): " + song[i].artists.map(displayArtistName));
      console.log("Song name: " + song[i].name);
      console.log("Preview song: " + song[i].preview_url);
      console.log("The album: " + song[i].album.name);
    }
  });
};




var liriLogic = function (argData, funcData) {
  switch (argData) {
    case "concert-this": getBand(funcData);
      break;
    case "spotify-this-song": getSpotify(funcData);
      break;
    case "movie-this": getMovie(funcData);
      break;
    case "do-what-it-says": readTheFile();
      break;
    default: console.log("LIRI doesn't know that.");

  }
};

var runLiri = function (arg1, arg2) {
  liriLogic(arg1, arg2);
};

runLiri(process.argv[2], process.argv[3]);