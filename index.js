listname = [];

function listChecker(list, book) {
	if (listname.some((data) => data.list === list)) {
		let obj = listname.find((obj) => obj.list == list);
		obj.books.push(book);
		return;
	} else {
		const listName = document.getElementsByClassName('listNames');
		const listItem = document.createElement('li');
		const newButton = document.createElement('button');
		newButton.innerText = list;
		listName[0].appendChild(listItem).appendChild(newButton);
		listname.push({ list: list, books: [book] });
		// NEED TO ADD EVENT LISTENER TO EACH BUTTON TO SHOW LIST ITEMS
		// newbutton.addEventListener('click', function (event) {
		// 	modalWork.showModal(book)
	}
	console.log(listname);
	const buttonInformationGetter = document.getElementsByTagName('button');
	listTitle = buttonInformationGetter.innerText;
	// listname.push(buttonInformationGetter);
	// console.log(listname);
}
function addListName(book) {
	// const listName = document.getElementsByClassName('listNames');
	// const listItem = document.createElement('li');
	// const newButton = document.createElement('button');
	// newButton.innerText = book.title;
	// listName[0].appendChild(listItem).appendChild(newButton);

	listChecker(book.list, book);
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

fetchAsync();
