// Declare global variables
var searchHistory = document.getElementById("history-list");
var movies = JSON.parse(localStorage.getItem("movies")) || [];

// Function to get movie title from API call
function getMovieTitle(movieTitle) {
	// The following code snippet is from the RapidAPI, MOVIEDATABASE API. The following
	// code snippet uses jQuery to run the associated functions.
    const settings = {
		// Boolean indicating that the request should be handled asynchronously
	    async: true,
		// Boolean indicating to trigger a cross-origin request
	    crossDomain: true,
		// URL to which the AJAX request is made
	    url: 'https://moviesdatabase.p.rapidapi.com/titles/search/title/' + movieTitle + '?exact=true&titleType=movie',
	    method: 'GET',
		// Header object that contains the API Key for user authentication when request is sent
    	// and the specified host
	    headers: {
		    'X-RapidAPI-Key': 'ca79fa9bf9msh9d23e3356f2b48ep1f9043jsn1218866eabb6',
		    'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
	    }
    };
	// Initiates AJAX request based on the above "settings" object
    $.ajax(settings).done(function (response) {
	console.log(response);
    });
};

// Function to save search history
function saveHistory(movieTitle) {
	movieTitle = movieTitle.toLowerCase();
	if (movies.includes(movieTitle) === false) {
		movies.push(movieTitle);
		var movieJSON = JSON.stringify(movies);
		localStorage.setItem("movie", movieJSON);
		displayHistory();
	};
};

// Function to display search history
function displayHistory() {
	searchHistory.textContent = "";
};

// Event listener for submit button
$(".button").on("click", function() {
	var movieTitle = $(".input").val(); 
	getMovieTitle(movieTitle);
	// Clears search input value
	$(".input").val("");
});

const youtubeAPI = 'AIzaSyCvc0I7KxpZuIAultkVrpW-eYQGLKNXaSg';
const youtubeURL = 'https://www.googleapis.com/youtube/v3/search';
function searchByKeyword() {
    var results = YouTube.Search.list('id,snippet', {q: 'movieTitle', maxResults: 1});
    for(var i in results.items) {
      var item = results.items[i];
      Logger.log('[%s] Title: %s', item.id.videoId, item.snippet.title);
    };
  };
