// The following code snippet is from the RapidAPI, MOVIEDATABASE API. The following
// code snippet uses jQuery to run the associated functions.

const settings = {

    // Boolean indicating that the request should be handled asynchronously
	async: true,
    // Boolean indicating to trigger a cross-origin request
	crossDomain: true,
    // URL to which the AJAX request is made
	url: 'https://moviesdatabase.p.rapidapi.com/titles',
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

const youtubeAPI = AIzaSyCvc0I7KxpZuIAultkVrpW-eYQGLKNXaSg;
const youtubeURL = 'https://www.googleapis.com/youtube/v3/search';
function searchByKeyword() {
    var results = YouTube.Search.list('id,snippet', {q: 'movieTitle', maxResults: 1});
    for(var i in results.items) {
      var item = results.items[i];
      Logger.log('[%s] Title: %s', item.id.videoId, item.snippet.title);
    }
  }

// Variable for user input
movieTitle = $("#user-input").val(); 

// Function to get movie title from API call
function getMovieTitle() {
    const settings = {
	    async: true,
	    crossDomain: true,
	    url: 'https://moviesdatabase.p.rapidapi.com/titles/search/title/' + movieTitle + '?exact=true&titleType=movie',
		// The following URL and query parameters looks for movies based on the exact movie title searched by the user and 
		// should hopefully return the searched movie and the IMDB ratings for that movie
		// url: `https://moviesdatabase.p.rapidapi.com/titles/search/title/${movieTitle}?exact=true&titleType=movie&info=rating`,
	    method: 'GET',
	    headers: {
		    'X-RapidAPI-Key': 'ca79fa9bf9msh9d23e3356f2b48ep1f9043jsn1218866eabb6',
		    'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
	    }
    };
    $.ajax(settings).done(function (response) {
	console.log(response);
    });
};

// Event listener for submit button
$("#submit-btn").on("click", getMovieTitle);
=======

