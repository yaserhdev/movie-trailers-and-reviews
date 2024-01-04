const settings = {
	async: true,
	crossDomain: true,
	url: 'https://moviesdatabase.p.rapidapi.com/titles',
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ca79fa9bf9msh9d23e3356f2b48ep1f9043jsn1218866eabb6',
		'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});