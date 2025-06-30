const myLibrary = [];

function Book(id, title, author, pages) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
}

function addBookToLibrary(id, title, author, pages) {
  const book = new Book(id, title, author, pages);
  myLibrary.push(book);
}

addBookToLibrary(crypto.randomUUID(), "Atomic Habits", "James Clear", 320);
addBookToLibrary(crypto.randomUUID(), "Hobbit", "J.R.R. Tolkien", 420);
console.log(myLibrary);

const bookList = document.querySelector(".book-list");
const bookCard = document.createElement("div");
bookCard.setAttribute("class", "book-card");

for(let book of myLibrary) {
    console.log(book);
    const titleElement = document.createElement("h4");
    titleElement.textContent = `${book.title}`;

    const authorElement = document.createElement("h4");
    authorElement.textContent = `${book.author}`;

    const pagesElement = document.createElement("p");
    pagesElement.textContent = `${book.pages}`;


    bookCard.appendChild(titleElement);
    bookCard.appendChild(authorElement);
    bookCard.append(pagesElement);
    bookList.appendChild(bookCard);
} 
