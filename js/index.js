listname = [];

function listChecker(list, book) {
	if (listname.some((data) => data.list === list)) {
		let obj = listname.find((obj) => obj.list == list);
		obj.books.push(book);
		return;
	} else {
		divClassName = list.split(' ').join('');
		divClassNameReplaced = divClassName.replace(/\W/g, '');
		$('.listNames').append(
			$(document.createElement('li')).append(
				$(document.createElement('button'))
					.addClass('btn')
					.attr('data-toggle', 'modal')
					.attr('data-target', `#${divClassNameReplaced}`)
					.text(list)
			)
		);

		listname.push({ list: list, books: [book] });
	}

	if ($('#loadingInfo').text() == 'Loading... One Moment...') {
		$('#loadingInfo').hide();
	}
}

async function fetchAsync() {
	// await response of fetch call
	let response = await fetch('https://library-listings.herokuapp.com/');
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
			listChecker(book.list, book);
		});
		listname.map((data) => {
			//Creating modal for each list
			const divClassName = data.list.split(' ').join('');
			divClassNameReplaced = divClassName.replace(/\W/g, '');
			$('.container-fluid').append(
				$(document.createElement('div'))
					.addClass('modal fade')
					.attr('id', divClassNameReplaced)
					.append(
						$(document.createElement('div'))
							.addClass('modal-dialog modal-lg')
							.append(
								$(document.createElement('div'))
									.addClass('modal-content')
									.append(
										$(document.createElement('div'))
											.addClass('modal-header')
											.text(data.list)
											.append(
												$(document.createElement('button'))
													.attr('data-dismiss', 'modal')
													.attr('type', 'button')
													.text('Close')
											)
									)
									.append(
										$(document.createElement('div')).addClass('modal-body')
									)
									.append(
										$(document.createElement('div'))
											.addClass('modal-footer')
											.append(
												$(document.createElement('button'))
													.attr('data-dismiss', 'modal')
													.attr('type', 'button')
													.text('Close')
											)
									)
							)
					)
			);
			data.books.map((book) => {
				$(`#${divClassNameReplaced}`)
					.find('.modal-body')
					.append(
						$(document.createElement('div'))
							.addClass('bookItem')
							.append(
								$(document.createElement('div'))
									.addClass('title')
									.html(
										`${book.title}<span class='author'>${book.author}</span>`
									)
							)
							.append(
								$(document.createElement('div'))
									.addClass('photo')
									.html(`<img src="${book.image}">`)
							)
							.append(
								$(document.createElement('div'))
									.addClass('hooplaLink')
									.html(
										`<a href="${book.link}" target="_blank">Check me out on Hoopla!</a>`
									)
							)
					);
			});
		});
	})
	.catch((reason) => console.log(reason.message));

fetchAsync();
