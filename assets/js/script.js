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

const youtubeAPI = AIzaSyCvc0I7KxpZuIAultkVrpW-eYQGLKNXaSg
const youtubeURL = https://www.googleapis.com/youtube/v3/search
function searchByKeyword() {
    var results = YouTube.Search.list('id,snippet', {q: 'dogs', maxResults: 1});
    for(var i in results.items) {
      var item = results.items[i];
      Logger.log('[%s] Title: %s', item.id.videoId, item.snippet.title);
    }
  }