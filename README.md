
# Liri-Node-App

### Overview

In this assignment we created the app called LIRI. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

## Link to the github repository
https://github.com/fred1n/liri-node-app

## The Stack
Node.js
Axios
Inquirer
Dotenv
Moment.js

## How it works
You will need to open up a terminal with GitBash or some other tool where you can run a Node application.

Once the terminal is open and run node liri.js

![Terminal Image](https://github.com/fred1n/liri-node-app/images/terminal1.png)

 ### The app has can take in one of the following commands:

* `concert-this` - Below is the way the command should be entered:

        1. `node liri.js concert-this <artist/band name here>`

        * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

            * Name of the venue

            * Venue location

            * Date of the Event (use moment to format this as "MM/DD/YYYY")

![ConcertThis Image](https://github.com/fred1n/liri-node-app/images/concertthis.png)

* `spotify-this-song` - Below is the way the command should be entered:
        2. `node liri.js spotify-this-song '<song name here>'`

        * This will show the following information about the song in your terminal/bash window

            * Artist(s)

            * The song's name

            * A preview link of the song from Spotify

            * The album that the song is from

        * If no song is provided then your program will default to "The Sign" by Ace of Base.

![SpotifyThis Image](https://github.com/fred1n/liri-node-app/images/spotifythis.png)

* `movie-this` - Below is the way the command should be entered:
        3. `node liri.js movie-this '<movie name here>'`

        * This will output the following information to your terminal/bash window:

            ```
            * Title of the movie.
            * Year the movie came out.
            * IMDB Rating of the movie.
            * Rotten Tomatoes Rating of the movie.
            * Country where the movie was produced.
            * Language of the movie.
            * Plot of the movie.
            * Actors in the movie.
            ```

        * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

            * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>

            * It's on Netflix!
![MovieThis Image](https://github.com/fred1n/liri-node-app/images/moviethis.png)

 * `do-what-it-says` - Below is the way the command should be entered:
        4. `node liri.js do-what-it-says`

        * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

            * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

            * Edit the text in random.txt to test out the feature for movie-this and concert-this.

![MovieThis Image](https://github.com/fred1n/liri-node-app/images/dothisthing.png)

Challenges
I enjoyed making this as I am starting to feel more comfortable with my javascript ability. The first problem I met was using the switch case as previously I had only used if/else statements. The second problem had to do with getting the spotify and movie searches to default. I tried a few different ways but landed on using the || operator within the template literal. Outside of the code issues this was the first time I had installed npm packages, fairly straightforward but I did type in the wrong command a few times. This led to my understanding of the value of reading the documentation available. I also learned about .gitignore and why it is important to not commit everything to Github.
