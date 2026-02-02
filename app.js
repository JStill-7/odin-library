// DOM ELEMENTS
let form = document.querySelector('#book-form');
let bookTitle = document.querySelector('#titleInput');
let bookAuthor = document.querySelector('#authorInput');
let numPages = document.querySelector('#pagesInput');
let readCheckBox = document.querySelector('#myCheckbox');
// let submitBtn = document.querySelector('#book-btn-submit');
// let bookCard = document.querySelector('.book-card');
let bookSection = document.querySelector('.book-section');
let deleteBtn = document.querySelector('.delete-book');
let bookCover = document.querySelector('#myFile');


const myLibrary = [];

// Starter books (for visual/demo purposes)
const starterBooks = [
  {
    id: crypto.randomUUID(),
    cover: 'HaloEpitaphCoverFront.jpg',
    title: 'Halo:Epitaph',
    author: 'Kelly Gay',
    pages: 304,
    read: true,
  },
  {
    id: crypto.randomUUID(),
    cover: 'Halo_Edge_of_Dawn_Front_Cover.jpg',
    title: 'Halo: Edge of Dawn',
    author: 'Kelly Gay',
    pages: 336,
    read: false,
  },
  {
    id: crypto.randomUUID(),
    cover: 'Halo_New_Blood_cover.jpg',
    title: 'Halo: New Blood',
    author: 'Matt Forbeck',
    pages: 200,
    read: true,
  }
];

//BOOK CLASS
class Book {
  constructor(title,author,pages,read, cover = '') {
    this.id = crypto.randomUUID();
    this.title = title; 
    this.author = author; 
    this.pages = pages;
    this.read = read;
    this.cover = cover;
  }


}



function renderLibrary() {
  // clear existing books
  bookSection.innerHTML = '';

  // loop through all books
  myLibrary.forEach(book => {
    const card = document.createElement('div');
    card.classList.add('book-card');
    card.dataset.id = book.id;

    card.innerHTML = `
      ${book.cover ? `<img src="${book.cover}" alt="Book Cover" class="book-cover">` : ''}
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Read: <input type="checkbox" class="read-toggle" ${book.read ? 'checked' : ''}></p>
      <button class="delete-book"><img id="trash-svg" src="svg/trash-svgrepo-com.svg" alt="trash-svg"></button>
    `;

    // add to DOM
    bookSection.appendChild(card);

    // read toggle
    const readToggle = card.querySelector('.read-toggle');
    readToggle.addEventListener('change', function () {
      book.read = this.checked;
      console.log(`${book.title} read status updated:`, book.read);
    });

    // delete button
    const deleteBtn = card.querySelector('.delete-book');
    deleteBtn.addEventListener('click', function () {
      const index = myLibrary.findIndex(b => b.id === book.id);
      if (index !== -1) myLibrary.splice(index, 1);
      card.remove();
      console.log(`Deleted: ${book.title}`);
      console.log(myLibrary);
    });
  });
}


//add book form button
form.addEventListener('submit', function (event) {
  event.preventDefault();

  // get all inputs inside the form
  const inputs = form.querySelectorAll('input[required]');

  // check each one
  inputs.forEach(input => {
    if (!input.checkValidity()) {
      input.style.border = '2px solid red';
    } else {
      input.style.border = '2px solid green';
    }
  });

  if (form.checkValidity()) {
  const file = bookCover.files[0];
  const coverURL = file ? URL.createObjectURL(file) : '';

  const newBook = new Book(
    bookTitle.value,
    bookAuthor.value,
    numPages.value,
    readCheckBox.checked,
    coverURL
  );

  myLibrary.push(newBook);
  renderLibrary();
  form.reset();
  }
});



// Load starter books on page load
starterBooks.forEach(b => {
  myLibrary.push(
    new Book(b.title, b.author, b.pages, b.read, b.cover)
  );
});
renderLibrary();