class Book {
	constructor(title, author, category, year) {
		this.title = title;
		this.author = author;
		this.category = category;
		this.year = year;
		this.id = Date.now();
	}
}

class UI {
	addBookToList(book) {
		//get parent
		const list = document.getElementById('book-list');

		//create tr element
		const row = document.createElement('tr');

		//insert cols into the table
		row.innerHTML = `<td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.category}</td>
                    <td>${book.year}</td>
                    <td><a href="#" class="delete">X<a></td>`;
		list.appendChild(row);
		row.book = book;
	}

	showAlert(message, className) {
		//create a div tag to html
		const div = document.createElement('div');
		//add class
		div.className = `alert ${className}`;
		//add text into the div element
		const text = document.createTextNode(message);
		div.appendChild(text);
		//get parent
		const container = document.querySelector('.container');
		const form = document.querySelector('#book-form');
		//insert alert before form into container
		container.insertBefore(div, form);
		//timeout after 2 sec
		setTimeout(() => {
			document.querySelector('.alert').remove();
		}, 2000);
	}

	//delete a table row
	deleteBook(target) {
		if (target.className === 'delete') {
			target.closest('tr').remove();
		}
	}

	clearFields() {
		document.getElementById('title').value = '';
		document.getElementById('author').value = '';
		document.getElementById('category').value = '';
		document.getElementById('year').value = '';
	}
}

//local storage
class Store {
	//return an array with books
	static getBooks() {
		let books;
		//if there are no books in the ls, return an empty array
		if (localStorage.getItem('books') === null) {
			books = [];
		} else {
			//read the JSOM object and translate it into an array of object
			books = JSON.parse(localStorage.getItem('books'));
			books.sort((book1, book2) => {
				if (book1.title < book2.title) {
					return -1;
				} else {
					return 1;
				}
			});
		}
		return books;
	}

	static displayBooks() {
		//get the array of books from the ls
		const books = Store.getBooks();
		//loop over the array and add to the UI list
		books.forEach((book) => {
			const ui = new UI();
			ui.addBookToList(book);
		});
	}

	static addBook(book) {
		const books = Store.getBooks();
		//add in the list of books
		books.push(book);
		//save in the ls
		localStorage.setItem('books', JSON.stringify(books));
	}

	static removeBook(id) {
		//get the book from the local storage
		const books = Store.getBooks();

		//remove books with the same title and author
		const booksLeft = books.filter((book) => {
			if (book.id === id) {
				return false;
			} else {
				return true;
			}
		});
		localStorage.setItem('books', JSON.stringify(booksLeft));
	}
}

//event listener on DOM
document.addEventListener('DOMContentLoaded', Store.displayBooks);

//event listner for book. listen when you want to add a book on your list
document.getElementById('book-form').addEventListener('submit', (e) => {
	//create some variables
	const title = document.getElementById('title').value,
		author = document.getElementById('author').value,
		category = document.getElementById('category').value,
		year = document.getElementById('year').value;
	//instanciate a book
	const book = new Book(title, author, category, year);

	//instance a UI
	const ui = new UI();

	//if imput is empty show an error message
	if (title === '' || author === '' || category === '' || year === '') {
		//error in UI
		ui.showAlert('Please fill in all fields', 'error');
	} else {
		//add a bok to list of books
		ui.addBookToList(book);

		//add a book to the local storage
		Store.addBook(book);

		//show success
		ui.showAlert('Book added!', 'success');

		//clearfields
		ui.clearFields();
	}

	e.preventDefault();
});

//event listener for delete
document.getElementById('book-list').addEventListener('click', (e) => {
	const ui = new UI();
	ui.deleteBook(e.target);
	//get the closest ancestor with a tag name of tr
	const row = e.target.closest('tr');
	Store.removeBook(row.book.id);

	//show alert
	ui.showAlert('Book removed', 'success');

	e.preventDefault();
});
