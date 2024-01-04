// This code snippet was obtained from RapidAPI, MovieDatabase API. It is intended to be used
// to gather information about movie titles searched for by the user.

// This is the endpoint URL to which the API request is made.
const url = 'https://moviesdatabase.p.rapidapi.com/titles';

// This object contains the configuration options for the fetch requests
const options = {
	method: 'GET',
    //  These headers are additional information sent along with the request or response. They
    // provide metadata about the request or the data being sent.
	headers: {
        // The RapidAPI-Key header is used for authentication, containing the API key that
        // identifies the user making the request
		'X-RapidAPI-Key': 'ca79fa9bf9msh9d23e3356f2b48ep1f9043jsn1218866eabb6',

        // This header is used to specify the host to which the request is being sent.
        // It helps the server route the request to the correct endpoint.
		'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
	}
};

try {
    // Attempt to make an HTTP request
	const response = await fetch(url, options);

    // Extract text content from the response
	const result = await response.text();

    // Log the result to the console
	console.log(result);
} catch (error) {

    // Logs the error the console
	console.error(error);
}