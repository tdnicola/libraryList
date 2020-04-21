listname = [];

function listChecker(list, book) {
	if (listname.some((data) => data.list === list)) {
		let obj = listname.find((obj) => obj.list == list);
		obj.books.push(book);
		return;
	} else {
		divClassName = list.split(' ').join('');
		divClassNameReplaced = divClassName.replace(/\W/g, '');

		buttonList = document.createElement('button');
		buttonList.setAttribute('type', 'button');
		buttonList.classList.add('btn');
		// buttonList.classList.add('btn-primary');
		buttonList.setAttribute('data-toggle', 'modal');

		buttonList.setAttribute('data-target', '#' + divClassNameReplaced);

		const listName = document.getElementsByClassName('listNames');
		const listItem = document.createElement('li');
		buttonList.innerText = list;
		listName[0].appendChild(listItem).appendChild(buttonList);

		listname.push({ list: list, books: [book] });
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
			const divClassName = data.list.split(' ').join('');
			divClassNameReplaced = divClassName.replace(/\W/g, '');
			const divFade = document.createElement('div');
			divFade.classList.add('modal');
			divFade.classList.add('fade');
			divFade.setAttribute('id', divClassNameReplaced);

			const divDialog = document.createElement('div');
			divDialog.classList.add('modal-dialog');
			divDialog.classList.add('modal-lg');
			const divContentBody = document.createElement('div');
			divContentBody.classList.add('modal-content');
			const divModalHeader = document.createElement('div');
			const topCloseButton = document.createElement('button');
			topCloseButton.setAttribute('type', 'button');
			topCloseButton.setAttribute('data-dismiss', 'modal');
			topCloseButton.innerText = 'X';
			divModalHeader.classList.add('modal-header');
			divModalHeader.innerText = data.list;
			const divModalBody = document.createElement('div');
			divModalBody.classList.add('modal-body');

			divDialog.appendChild(divContentBody);
			divContentBody.appendChild(divModalHeader);
			divContentBody.appendChild(divModalBody);
			divFade.appendChild(divDialog);

			divModalFooter = document.createElement('div');
			divModalFooter.classList.add('modal-footer');
			closeButton = document.createElement('button');
			closeButton.setAttribute('type', 'button');
			closeButton.setAttribute('data-dismiss', 'modal');
			closeButton.innerText = 'Close';
			divModalHeader.appendChild(topCloseButton);
			divModalFooter.appendChild(closeButton);
			divContentBody.appendChild(divModalFooter);
			const container = document.getElementsByClassName('container-fluid');
			container[0].append(divFade);

			data.books.map((book) => {
				const bookItem = document.createElement('div');
				const photoDiv = document.createElement('div');
				const titleDiv = document.createElement('div');
				const hooplaLink = document.createElement('div');
				bookItem.classList.add('bookItem');
				photoDiv.classList.add('photo');
				titleDiv.classList.add('title');
				hooplaLink.classList.add('hooplaLink');
				titleDiv.innerHTML = `${book.title} <span class='author'>${book.author} </span>`;
				photoDiv.innerHTML = `<img src="${book.image}">`;
				hooplaLink.innerHTML = `<a href="${book.link}" target="_blank">Check me out on Hoopla!</a>`;
				bookItem.appendChild(titleDiv);
				bookItem.appendChild(photoDiv);
				bookItem.appendChild(hooplaLink);
				divModalBody.appendChild(bookItem);
			});
		});
	})
	.catch((reason) => console.log(reason.message));

fetchAsync();
