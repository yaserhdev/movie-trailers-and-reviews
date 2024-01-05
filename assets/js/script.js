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
		// The following URL and query parameters looks for movies based on the exact movie title searched by the user and 
		// should hopefully return the searched movie and the IMDB ratings for that movie
		// url: `https://moviesdatabase.p.rapidapi.com/titles/search/title/${movieTitle}?exact=true&titleType=movie&info=rating`,
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



// Function to display search history



// Event listener for submit button
$(".button").on("click", function() {
	var movieTitle = $(".input").val(); 
	getMovieTitle(movieTitle);
	$(".input").val("");
});
