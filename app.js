console.log('testing');

let form = document.querySelector('#book-form');
let bookTitle = document.querySelector('#titleInput');
let bookAuthor = document.querySelector('#authorInput');
let numPages = document.querySelector('#pagesInput');
let readCheckBox = document.querySelector('#myCheckbox');
let submitBtn = document.querySelector('#book-btn-submit');
let bookCard = document.querySelector('.book-card');
let bookSection = document.querySelector('.book-section');
let deleteBtn = document.querySelector('.delete-book');
let bookCover = document.querySelector('#myFile');


const myLibrary = [];

function Book(title,author,pages,read) {
  // the constructor
  this.title = title; 
  this.author = author; 
  this.pages = pages;
  this.read = read;

}

function addBookToLibrary() {
  // take params, create a book then store it in the array

  const file = bookCover.files[0]; // get the first selected file
  const coverURL = file ? URL.createObjectURL(file) : ''; // create temporary URL

  let book = {
    id:crypto.randomUUID(), // unique ID
    cover: coverURL,
    title : bookTitle.value,
    author : bookAuthor.value,
    pages: numPages.value,
    read : readCheckBox.checked,

  };
  
  myLibrary.push(book);
}

function updateBookSection() {
// get the most recent book
  const latestBook = myLibrary[myLibrary.length - 1];

  // create a new card element
  const card = document.createElement('div');
  card.classList.add('book-card');
  card.dataset.id = latestBook.id; // store the book ID

  card.innerHTML = `
    ${latestBook.cover ? `<img src="${latestBook.cover}" alt="Book Cover" class="book-cover">` : ''}
    <h3>${latestBook.title}</h3>
    <p>Author: ${latestBook.author}</p>
    <p>Pages: ${latestBook.pages}</p>
    <p>Read: <input type="checkbox" class="read-toggle" ${latestBook.read ? 'checked' : ''}></p>
    <button class="delete-book"> <img id="trash-svg" src="svg/trash-svgrepo-com.svg" alt="trash-svg"></button>
  `;

  // append it to the section
  bookSection.appendChild(card);

 const readCheckBox = card.querySelector('.read-toggle');

  readCheckBox.addEventListener('change', function() {
  latestBook.read = this.checked; // update the book object
  console.log(myLibrary);
});

  const deleteBtn = card.querySelector('.delete-book');
  deleteBtn.addEventListener('click', function () {
    const id = parseInt(card.dataset.id, 10);

    // remove from array
    const index = myLibrary.findIndex(book => book.id === id);
    if (index !== -1) {
      myLibrary.splice(index, 1);

    }
    console.log('Deleting book…');
    card.remove(); // removes the entire card
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
    addBookToLibrary();
    updateBookSection();
    console.log(myLibrary);
    form.reset();

    // clear the borders after submit
    inputs.forEach(input => input.style.border = '');
  } else {
    console.log('invalid input');
  }
});

//button to delete starter content
deleteBtn.addEventListener('click',function(){
  console.log('testing dlt btn');
  bookCard.remove();
  console.log(myLibrary)
})

