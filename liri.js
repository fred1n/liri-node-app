require("dotenv").config();

var keys = require("./keys.js");

// =================================================

// http://www.omdbapi.com/?i=tt3896198&apikey=6d1b76ad

var inquirer = require("inquirer");

var request = require('request');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var fs = require('fs');

//Stored argument's array
var nodeArgv = process.argv;
var command = process.argv[2];
var command2 = process.argv[3];

// console.log("nodeArgv: " + nodeArgv);
// console.log("command: " +command);
// console.log("command2: " +command2);
//===============================================
// var lirisresponse = ["Hello, my name is Liri your personal assistant created to assist you.\nI am actually a NODE.js version of Siri created to assist you in making entertainment selections.",
// 	"How are you doing today? What would you like to do?",
// 	];
// var options = ["Look for an artist/concert", "Spotify a song", "Movie this", "Do what it says", "See how many greetings I have", "Quit"];

// functions

// user interfaces
// function responses() {
	// var index = Math.floor(Math.random() * lirisresponse.length);
	// console.log("\n-------------------------------------------------");
	// console.log("\n" + lirisresponse[index]);
	// console.log("\n-------------------------------------------------\n");
	// fs.appendFile("log.txt", moment().format("MM/DD/YYYY HH:mm:ss") + " " + "Liri's launch" + "\n", function(err) {
	// 	if (err) {
	// 		return console.log(err);
	// 	}
	// });
// 	inquirer.prompt([
// 		{
// 			type: "list",
// 			message: "What would you like to do today?\n",
// 			choices: options,
// 			name: "choice"
// 		}
// 		]).then(function(res) {
// 			switch(res.choice) {
// 				case options[0]:
// 					tweet();
// 					// logtxt(options[0]);
// 					break;

// 				case options[1]:
// 					tweets();
// 					// logtxt(options[1]);
// 					break;

// 				case options[2]:
// 					spotifyasong();
// 					// logtxt(options[2]);
// 					break;

// 				case options[3]:
// 					moviethis();
// 					// logtxt(options[3]);
// 					break;

// 				case options[4]:
// 					dowhat();
// 					// logtxt(options[4]);
// 					break;

// 				case options[5]:
// 					randomgreet();
// 					// logtxt(options[5]);
// 					break;

// 				case options[6]:
// 					console.log("\n-------------------------------------------------");
// 					console.log("\nWe were happy to help you today...see you next time.");
// 					console.log("\n-------------------------------------------------");
// 					// logtxt(options[6]);
// 					break;

// 				default:
// 					console.log("Oops, I'm unable to assist you today!");
// 			}
// 		})
// };



//===============================================
//movie or song
var selection = "";

//  console.log("nodeArgv.length: " +nodeArgv.length);

//attaches multiple word arguments
for (var i=3; i<nodeArgv.length; i++){
  if(i>3 && i<nodeArgv.length){
    selection = selection + "+" + nodeArgv[i];
  } else{
    selection = selection + nodeArgv[i];
  }
}

// console.log("selection "+selection);
//switch case
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
      omdbData("Matrix");
    };  
  break;

  case "do-what-it-says":
    doThing();
  break;

  default:
    console.log("{Please enter a command: concert-this, spotify-this-song, movie-this, do-what-it-says}");
  break;
}

function events(artistband){
  artist = artistband
  var eventURL = 'https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp';

  
  request(eventURL, function (error, response, body){
       
    if(!error && response.statusCode == 200){
      var body = JSON.parse(body);
      console.log("\nName of the venue: " + body[0].venue.name);
      console.log("Venue location: " + body[0].venue.city);
      console.log("Date of the Event: " + body[0].datetime);

      //adds text to log.txt
      // console.log("Name of the venue: " + body.Title);
      // console.log("Venue location: " + body.Year);
      // console.log("Date of the Event: " + body.imdbRating);

    } else{
      console.log('Error occurred in the Events Function.')
    }
  });

}

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
      fs.appendFile('log.txt', "-----------------------");
      fs.appendFile('log.txt', "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
      fs.appendFile('log.txt', "It's on Netflix!");
    }
  });

}

function doThing(){
  fs.readFile('random.txt', "utf8", function(error, data){
    var txt = data.split(',');

    spotifySong(txt[1]);
  });
}
