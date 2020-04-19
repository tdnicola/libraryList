listname = [];

function listChecker(list) {
	if (listname.includes(list) == true) {
		console.log('rejected: ' + list);
		return;
	} else {
		const listName = document.getElementsByClassName('listNames');
		const listItem = document.createElement('li');
		const newButton = document.createElement('button');
		newButton.innerText = list;
		listName[0].appendChild(listItem).appendChild(newButton);
		listname.push({ list: list, books: [] });
		// console.log(listname);
		// NEED TO ADD EVENT LISTENER TO EACH BUTTON TO SHOW LIST ITEMS
		// newbutton.addEventListener('click', function (event) {
		// 	modalWork.showModal(book)
	}
	const buttonInformationGetter = document.getElementsByTagName('button');
	listTitle = buttonInformationGetter.innerText;
	// listname.push(buttonInformationGetter);
	console.log(listname);
}
function addListName(book) {
	// const listName = document.getElementsByClassName('listNames');
	// const listItem = document.createElement('li');
	// const newButton = document.createElement('button');
	// newButton.innerText = book.title;
	// listName[0].appendChild(listItem).appendChild(newButton);

	listChecker(book.title);
	console.log(listname);
	// if (document.)

	// NEED TO ADD EVENT LISTENER TO EACH BUTTON TO SHOW LIST ITEMS
	// newbutton.addEventListener('click', function (event) {
	// 	modalWork.showModal(book)
}

async function fetchAsync() {
	// await response of fetch call
	let response = await fetch('http://localhost:5000/');
	// only proceed once promise is resolved
	let data = await response.json();
	// only proceed once second promise is resolved
	return data;
}

fetchAsync()
	.then((data) => {
		var books = [];
		books.push(data);
		data.forEach((book) => {
			addListName(book);
		});
	})
	.catch((reason) => console.log(reason.message));
// books = fetchData();
// var books = fetchAsync().then((data) => {
// 	return data;
// });
// console.log(books);

fetchAsync();
