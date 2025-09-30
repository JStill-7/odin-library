console.log('testing');

let bookTitle = document.querySelector('#titleInput');
let bookAuthor = document.querySelector('#authorInput');
let numPages = document.querySelector('#pagesInput');
let readBox = document.querySelector('#myCheckbox');
let submitBtn = document.querySelector('#book-btn-submit');
let bookCard = document.querySelector('.book-card');
let bookSection = document.querySelector('.book-section');
let deleteBtn = document.querySelector('.delete-book');
let bookCover = document.querySelector('#myFile');


const myLibrary = ['dog', 'cat'];

function Book(title,author,pages,read) {
  // the constructor...
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
    id: Date.now(), // unique ID
    cover: coverURL,
    title : bookTitle.value,
    author : bookAuthor.value,
    pages: numPages.value,
    read : readBox.checked,

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
    <p>Read: ${latestBook.read ? 'Yes' : 'No'}</p>
    <button class="delete-book"> <img id="trash-svg" src="svg/trash-svgrepo-com.svg" alt="trash-svg"></button>
  `;

  // append it to the section
  bookSection.appendChild(card);

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


submitBtn.addEventListener('click', function(){

  console.log('CLICKED');
  addBookToLibrary();
  console.log(myLibrary);
  updateBookSection();


}) 

// deleteBtn.addEventListener('click',function(){
//   console.log('testing dlt btn');
//   card.remove();
// })