fetch('http://localhost:5000/')
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		console.log(data);
	});
