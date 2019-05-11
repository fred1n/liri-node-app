//init setup and keys
require("dotenv").config();

var keys = require("./keys.js");

// =================================================

var inquirer = require("inquirer");

var request = require('request');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var fs = require("fs");
var moment = require("moment");

//Stored argument's array
var nodeArgv = process.argv;
var command = process.argv[2];
var command2 = process.argv[3];

  console.log("\n\n\nCommand select: " + command + "\n===========================================================");

//event, movie or song
var selection = "";

//attaches multiple word arguments
for (var i=3; i<nodeArgv.length; i++){
  if(i>3 && i<nodeArgv.length){
    selection = selection + "+" + nodeArgv[i];
  } else{
    selection = selection + nodeArgv[i];
  }
}

fs.appendFile("log.txt", moment().format("MM/DD/YYYY HH:mm:ss") + " " + command + "\n", function(err) {
  if (err) {
    return console.log(err);
  }
});

//switch case to determine what to do based on what is entered
switch(command){
  case "concert-this":
  if(selection){
    events(selection);
  } else{
    events("Drake");
  }
break;

  case "spotify-this-song":
    if(selection){
      spotifySong(selection);
    } else{
      spotifySong("The Sign");
    }
  break;

  case "movie-this":    
    if(selection){
      omdbData(selection);
    } else{
      omdbData("Mr. Nobody");
    };  
  break;

  case "do-what-it-says":
    doWhatItSay();
  break;

  default:
    console.log("{\nPlease enter a command: concert-this, spotify-this-song, movie-this, do-what-it-says}");
  break;
}

// API call to return artist/band information
function events(artist){
  // artist = artistband
  var eventURL = 'https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp';

  
  request(eventURL, function (error, response, body){
       
    if(!error && response.statusCode == 200){
      var body = JSON.parse(body);
      console.log("\nName of the venue: " + body[0].venue.name);
      console.log("Venue location: " + body[0].venue.city);
      console.log("Date of the Event: " + body[0].datetime);

      //adds text to log.txt         
      // fs.appendFile('log.txt', "body[0].venue.name");
      // fs.appendFile('log.txt', body[0].venue.city);
      // fs.appendFile('log.txt', body[0].datetime);

    } else{
      console.log('Error occurred in the Events Function.')
    }
  });

}

// Spotify API call to return song information
function spotifySong(song){
  spotify.search({ type: 'track', query: song}, function(error, data){
    if(!error){
      for(var i = 0; i < data.tracks.items.length; i++){
        var songData = data.tracks.items[i];
        //artist
        console.log("Artist(s): " + songData.artists[0].name);
        //song name
        console.log("Song: " + songData.name);
        //spotify preview link
        console.log("Preview URL: " + songData.preview_url);
        //album name
        console.log("Album: " + songData.album.name);
        console.log("-----------------------");
        

        //adds text to log.txt
        // fs.appendFile('log.txt', songData.artists[0].name);
        // fs.appendFile('log.txt', songData.name);
        // fs.appendFile('log.txt', songData.preview_url);
        // fs.appendFile('log.txt', songData.album.name);
        // fs.appendFile('log.txt', "-----------------------");
      } 
    } else{
      console.log('Error occurred in the spotifySong function.');
    }
  });
}

// OMDB API call to return movie information
function omdbData(movie){
  var omdbURL =   'http://www.omdbapi.com/?t='+ movie +'&y=&plot=short&tomatoes=true&apikey=6d1b76ad';
  
  request(omdbURL, function (error, response, body){
    if(!error && response.statusCode == 200){
      var body = JSON.parse(body);

      console.log("\nTitle: " + body.Title);
      console.log("Release Year: " + body.Year);
      console.log("IMdB Rating: " + body.imdbRating);
      console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
      console.log("Country: " + body.Country);
      console.log("Language: " + body.Language);
      console.log("Plot: " + body.Plot);
      console.log("Actors: " + body.Actors);

      //adds text to log.txt
      // fs.appendFile('log.txt', "Title: " + body.Title);
      // fs.appendFile('log.txt', "Release Year: " + body.Year);
      // fs.appendFile('log.txt', "IMdB Rating: " + body.imdbRating);
      // fs.appendFile('log.txt', "Rotten Tomatoes Rating: " + body.tomatoRating);
      // fs.appendFile('log.txt', "Country: " + body.Country);
      // fs.appendFile('log.txt', "Language: " + body.Language);
      // fs.appendFile('log.txt', "Plot: " + body.Plot);
      // fs.appendFile('log.txt', "Actors: " + body.Actors);

    } else{
      console.log('Error occurred in the omdbData function.')
    }
    if(movie === "Mr. Nobody"){
      console.log("-----------------------");
      console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
      console.log("It's on Netflix!");

      //adds text to log.txt
      // fs.appendFile('log.txt', "-----------------------");
      // fs.appendFile('log.txt', "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
      // fs.appendFile('log.txt', "It's on Netflix!");
    }
  });

}

// Using a text file to console out information
function doWhatItSay(){
  fs.readFile('random.txt', "utf8", function(error, data){
    var txt = data.split(',');

    spotifySong(txt[1]);
  });
}