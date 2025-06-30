const myLibrary = [];

function Book(id, title, author, pages) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
}

console.log(myLibrary);

const bookList = document.querySelector(".book-list");

const dialog = document.querySelector("dialog");

document.querySelector(".book-add").addEventListener("click", () => {
    dialog.showModal();
});

document.querySelector(".dialog-book-add").addEventListener("click", () => {
    const bookTitle = document.querySelector("input[id=title]").value;
    
    addBookToLibrary(crypto.randomUUID(), bookTitle, "sdfsdfd", 2222);

    dialog.close();
});

document.querySelector(".cancel").addEventListener("click", () => {
    dialog.close();
});


function addBookToLibrary(id, title, author, pages) {
  const book = new Book(id, title, author, pages);
  myLibrary.push(book);

  refreshBookList();
}

function refreshBookList() {
  bookList.innerHTML = "";

  for(let book of myLibrary) {
    const bookCard = document.createElement("div");
    bookCard.setAttribute("class", "book-card");

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
}

addBookToLibrary(crypto.randomUUID(), "Atomic Habits", "James Clear", 320);
addBookToLibrary(crypto.randomUUID(), "Hobbit", "J.R.R. Tolkien", 420);

refreshBookList();
