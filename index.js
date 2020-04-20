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
		// newButton.classList.add(buttonClassName);
		newButton.innerText = list;
		listName[0].appendChild(listItem).appendChild(newButton);
		listname.push({ list: list, books: [book] });
		// NEED TO ADD EVENT LISTENER TO EACH BUTTON TO SHOW LIST ITEMS
		newButton.addEventListener('click', function (event) {
			divClassName = list.split(' ').join('');
			divSelector = document.getElementsByClassName(divClassName);
			divSelector[0].classList.toggle('hidden');
		});
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
			const modalBackground = document.createElement('div');
			modalBackground.classList.add('modalBackground');
			divClassName = data.list.split(' ').join('');
			modal.classList.add(divClassName);
			modal.classList.add('hidden');
			const bookList = document.createElement('div');
			bookList.classList.add('bookList');
			const exitButton = document.createElement('button');
			exitButton.classList.add('exitButton');
			exitButton.innerText = 'X';
			exitButton.addEventListener('click', function (event) {
				divSelector = document.getElementsByClassName(divClassName);
				divSelector[0].classList.toggle('hidden');
			});
			modalBackground.appendChild(bookList);
			modal.appendChild(modalBackground);
			modal.appendChild(exitButton);
			// function windowClick(event) {
			// 	if (event.target === !modal) {
			// 		// divSelector = document.getElementsByClassName(divClassName);
			// 		// divSelector[0].classList.toggle('hidden');
			// 		console.log('hello');
			// 	}
			// }
			// window.addEventListener('click', windowClick());
			container[0].appendChild(modal);
			data.books.map((book) => {
				const bookItem = document.createElement('div');
				const authorDiv = document.createElement('div');
				const photoDiv = document.createElement('div');
				const titleDiv = document.createElement('div');
				const hooplaLink = document.createElement('div');
				bookItem.classList.add('bookItem');
				authorDiv.classList.add('author');
				photoDiv.classList.add('photo');
				titleDiv.classList.add('title');
				hooplaLink.classList.add('hooplaLink');

				titleDiv.innerText = book.title;
				authorDiv.innerText = 'Author: ' + book.author;
				photoDiv.innerHTML = `<img src="${book.image}">`;
				authorDiv.innerText = 'Author: ' + book.author;
				hooplaLink.innerHTML = `<a href="${book.link}">Hoopla</a>`;

				bookItem.appendChild(titleDiv);
				bookItem.appendChild(authorDiv);
				bookItem.appendChild(photoDiv);
				bookItem.appendChild(hooplaLink);
				bookList.appendChild(bookItem);
			});
		});
	})
	.catch((reason) => console.log(reason.message));

fetchAsync();
