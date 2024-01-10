// Assign search history list to a variable
var searchHistory = document.getElementById("history-list");
// Assign existing or empty search history array to a variable
var movies = JSON.parse(localStorage.getItem("movie")) || [];
// Assign review list to a variable
var reviewList = document.getElementById("reviews");
// Assign gif area to a variable
var giffy = document.getElementById("giffy");
// Assign the search input to a variable
var input = document.getElementById("search-input");

// Function to get movie info
function getMovieInfo(movieTitle) {
	// Options for fetch request
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNTliNDBmMGMwOTdmNjM4ZDQ4YjhlNjlhMDkxNTA3NSIsInN1YiI6IjY1OTllNjI5MjE2MjFkMDI1YjEyNzIwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._hWhbcMnrwULC8RBE87ZQU64SQJGs4jQBKtTFJBSE64'
		}
	};
	// Fetch request based off movie title to retrieve title, movie ID, and synopsis from response
	fetch('https://api.themoviedb.org/3/search/movie?query=' + movieTitle + '&include_adult=false&language=en-US&page=1', options)
		.then(response => response.json())
		.then(response => {
			var date = new Date(response.results[0].release_date);
			var year = date.getFullYear();
			var title = (response.results[0].original_title + " " + year);
			displayTitle(title);
			var movieID = response.results[0].id;
			getMovieReviews(movieID);
			var synopsis = response.results[0].overview;
			displaySynopsis(synopsis);
			// Removes "hide" class from hidden elements
			$(".hide").removeClass("hide");
			getTrailerID(title);
			saveHistory(movieTitle);
			getGiffy(movieTitle);
		})
		// Catches error in API request and displays modal
		.catch((error) => $(".modal").addClass("is-active"));
};

// Function to display title
function displayTitle(title) {
	// Clears current title
	$("#current-movie").text("");
	// Displays new title
	$("#current-movie").text(title);
};

// Function to display synopsis
function displaySynopsis(synopsis) {
	// Clears current synopsis
	$("#synopsis").text("");
	// Displays new synopsis
	$("#synopsis").text(synopsis);
};

// Function to get YouTube API data
function getTrailerID(title) {
	// AJAX request based off movie title to retrieve YouTube video ID of official trailer from response
	$.ajax({
		url: "https://youtube.googleapis.com/youtube/v3/search?maxResults=5&order=relevance&q=" + title + "%20Official%20Trailer&key=AIzaSyBpROtHBnDHi9eC6qk0AlZk1waabA2WdCs",
		method: "GET"
	})
	.then(function(response) {
		// Function to assign source URL of official trailer from YouTube to iFrame element in HTML
		$(document).ready(function() {
			// Removes current iFrame URL
			$("iframe").removeAttr("src");
			var videoID = response.items[0].id.videoId;
			// Assigns new iFrame URL
			$("iframe").attr("src", "https://www.youtube.com/embed/" + videoID);
			// Alt text for trailer
			$("iframe").attr("alt", "YouTube official movie trailer for " + title + ".");
		});
	});
};

// Function to get movie reviews
function getMovieReviews(movieID) {
	// Options for fetch request
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
		  	Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNTliNDBmMGMwOTdmNjM4ZDQ4YjhlNjlhMDkxNTA3NSIsInN1YiI6IjY1OTllNjI5MjE2MjFkMDI1YjEyNzIwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._hWhbcMnrwULC8RBE87ZQU64SQJGs4jQBKtTFJBSE64'
		}
	};
	// Fetch request based off movie ID to retrieve movie reviews from response
	fetch('https://api.themoviedb.org/3/movie/' + movieID + '/reviews?language=en-US&page=1', options)
		.then(response => response.json())
		.then(response => {
			var reviews = [];
			// For loop to push each review from response to reviews array
			for (let i = 0; i < response.results.length; i++) {
				reviews.push(response.results[i].content);
			};
			displayReviews(reviews);		
		});
};

// Function to display reviews
function displayReviews(reviews) {
	// Removes current reviews
	$("li").remove();
	// For loop to display each review from reviews array
	for (let i = 0; i < reviews.length; i++) {
		var li = document.createElement("li");
		li.textContent = reviews[i];
		reviewList.appendChild(li);
	};
};

// Function to get and display gif
function getGiffy (movieTitle) {
	// Variables for fetch request to Giffy API
    var APIKey = "Vyq56LLo8dMdf8o9UXjv3AD6rkGETMiR";
    var giffyURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIKey + "&q=" + movieTitle + "&rating=g";
	// Fetch request based off movie title to retrieve gif data
    fetch(giffyURL)
	.then(response => response.json())
	.then(response => {
        var imgPath = response.data[0].images.fixed_height.url;
        var img = document.createElement("img");
        img.setAttribute("src", imgPath);
		// Alt text for gif
		img.setAttribute("alt", "Gif of " + movieTitle + " movie.");
		// Removes current gif
		$("img").remove();
        giffy.appendChild(img); 
	});
};

// Function to save search history
function saveHistory(movieTitle) {
	// Converts movie title to lowercase for comparison purposes
	movieTitle = movieTitle.toLowerCase();
	// If statement to check for existing movie in search history; if entered movie title was not previously entered it is pushed to movies array and saved to local storage
	if (movies.includes(movieTitle) === false) {
		movies.push(movieTitle);
		var movieJSON = JSON.stringify(movies);
		localStorage.setItem("movie", movieJSON);
		displayHistory();
	};
};

// Function to display search history
function displayHistory() {
	// Clears text content of search history list
	searchHistory.textContent = "";
	// For loop to display search history as buttons
	for (let i = 0; i < movies.length; i++) {
		var button = document.createElement('button');
		button.textContent = movies[i];
		searchHistory.appendChild(button);
		button.classList.add("button", "is-primary", "is-light", "history");
	};
	// Adds event listener to execute "loadHistory" function on click
	searchHistory.addEventListener("click", loadHistory);
};

// Function to display trailer, reviews, and synopsis of movie from search history when corresponding button is clicked
function loadHistory(event) {
	// Assigns text content of button that was clicked to a variable
	var movieTitle = event.target.textContent;
	getMovieInfo(movieTitle);
};

// Event listener for pressing enter key when searching for a movie
input.addEventListener("keydown", function(event) {
	// Check if the key pressed is the Enter key (key code 13)
	if (event.key === "Enter") {
    	// Perform the submit action
		event.preventDefault();
		var movieTitle = $(".input").val(); 
		getMovieInfo(movieTitle);
		// Clears search input value
		$(".input").val("");
  	};
});

// Event listener for clicking submit button
$(".search-btn").on("click", function() {
	// Assigns search input value to a variable
	var movieTitle = $(".input").val(); 
	getMovieInfo(movieTitle);
	// Clears search input value
	$(".input").val("");
});

// Event listener for clear history button
$(".clear-btn").on("click", function() {
	// Removes search history
    $(".history").remove();
	// Clears local storage
    localStorage.clear();
    resetPage();
});

// Event listener for closing modal
$(".modal-close").on("click", function() {
	$(".modal").removeClass("is-active");
});

// Function to reset page to initial state
function resetPage() {
    location.reload();
};

// Displays search history on page load
displayHistory();