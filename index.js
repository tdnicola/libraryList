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
		buttonClassName = list.split(' ').join('');
		newButton.classList.add(buttonClassName);
		newButton.innerText = list;
		listName[0].appendChild(listItem).appendChild(newButton);
		listname.push({ list: list, books: [book] });
		// NEED TO ADD EVENT LISTENER TO EACH BUTTON TO SHOW LIST ITEMS
		newButton.addEventListener('click', function (event) {
			newButton.classList.add('is.visable');
		});

		// createModals(list);
	}
	const buttonInformationGetter = document.getElementsByTagName('button');
	listTitle = buttonInformationGetter.innerText;
}

function addListName(book) {
	listChecker(book.list, book);
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
		listname.map((data) => {
			const container = document.getElementsByClassName('container');
			const modal = document.createElement('div');
			const bookList = document.createElement('ul');
			const exitButton = document.createElement('button');
			modal.appendChild(bookList);
			container[0].appendChild(modal);
			data.books.map((book) => {
				const bookListItem = document.createElement('li');
				bookListItem.innerText = book.title;
				bookList.appendChild(bookListItem);
			});
		});
	})
	.catch((reason) => console.log(reason.message));

fetchAsync();
