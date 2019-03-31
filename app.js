//Book represent a physical book you want to add on the list
function Book(titel, author, cathegory) {
	this.titel = title;
	this.author = author;
	this.cathegory = cathegory;
}

//UI constructor
function UI() {}

//create a prototype
UI.prototype.addBookToList = function(book) {
	//get the right tag
	const list = document.getElementById('book-list');

	//create tr element
	const row = document.createElement('tr');

	//insert cols into the table
	row.innerHTML = `	<td>${book.title}</td>
										<td>${book.author}</td>
										<td>${book.cathegory}</td>
										<td><a href="#" class="delete">X<a></td>`;
	list.appendChild(row);
};

//show alert
UI.prototype.showAlert = function(message, className) {
	//create a div tag to html
	const div = document.createElement('div');
	//add class
	div.className = `alert ${className}`;
	//add text
	div.appendChild(document.createTextNode(message));
	//get parent
	const container = document.querySelector('.container');
	const form = document.querySelector('#book-form');
	//insert alert
	container.insertBefore(div, form);
	//timeout after 3 sec
	setTimeout(function() {
		document.querySelector('.alert').remove();
	}, 3000);
};

//delete book
UI.prototype.deleteBook = function(target) {
	if (target.className === 'delete') {
		target.parentElement.parentElement.remove();
	}
};
//clear fields
UI.prototype.clearFields = function() {
	document.getElementById('title').value = '';
	document.getElementById('author').value = '';
	document.getElementById('cathegory').value = '';
};

//event listner for book. listen when you want to add a book on your list
document.getElementById('book-form').addEventListener('submit', function(e) {
	//create some variables
	const title = document.getElementById('title').value,
		author = document.getElementById('author').value,
		cathegory = document.getElementById('cathegory').value;
	//instanciate a book
	const book = new Book(title, author, cathegory);

	//instance a UI
	const ui = new UI();

	//validate
	if (title === '' || author === '' || cathegory === '') {
		//error in UI
		ui.showAlert('Please fill in all fields', 'error');
	} else {
		//add a bok to list of books
		ui.addBookToList(book);

		//show success
		ui.showAlert('Book added!', 'success!');

		//clearfields
		ui.clearFields();
	}

	e.preventDefault();
});

//event listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {
	const ui = new UI();
	ui.deleteBook(e.target);

	//show alert
	ui.showAlert('Booke removed', 'success');
	e.preventDefault();
});
