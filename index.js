const myLibrary = [];

class Book {
    constructor(id, title, author, pages, read) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

console.log(myLibrary);

const bookList = document.querySelector(".book-list");

const dialog = document.querySelector("dialog");
const bookForm = document.querySelector(".book-form");

document.querySelector(".book-add").addEventListener("click", () => {
    dialog.showModal();
});

document.querySelector(".dialog-book-add").addEventListener("click", () => {
    const bookTitle = document.querySelector("input[id=title]").value;
    const bookAuthor = document.querySelector("input[id=author]").value;
    const bookPages = document.querySelector("input[id=pages]").value;
    let bookRead = document.querySelector("input[id=read]").checked;

    if (bookTitle == null ||
        !bookAuthor ||
        !bookPages
    ) {
        showError("Please fill out all required fields!");
        return;
    }

    if(bookRead) {
        bookRead = "Read";
    } else {
        bookRead = "Unread";
    }
    
    addBookToLibrary(crypto.randomUUID(), bookTitle, bookAuthor, bookPages, bookRead);

    bookForm.reset();
    dialog.close();
});

document.querySelector(".cancel").addEventListener("click", () => {
    dialog.close();
});


function addBookToLibrary(id, title, author, pages, read) {
  const book = new Book(id, title, author, pages, read);
  myLibrary.push(book);

  refreshBookList();
}

function createBookList() {
    for(let book of myLibrary) {
        const bookCard = document.createElement("div");
        bookCard.setAttribute("class", "book-card");

        const titleElement = document.createElement("h4");
        titleElement.textContent = `${book.title}`;
        titleElement.style.fontSize = "1.6rem";

        const authorElement = document.createElement("h4");
        authorElement.textContent = `${book.author}`;

        const pagesElement = document.createElement("p");
        pagesElement.textContent = `${book.pages}`;
        pagesElement.style.color = "#aaa"

        const buttonsContainer = document.createElement("div");
        buttonsContainer.setAttribute("class", "card-button-container");

        const readElement = document.createElement("button");
        readElement.textContent = book.read;
        
        if(book.read === "Read") {
            readElement.style.backgroundColor = "#606C38";
        } else {
            readElement.style.backgroundColor = "#DDA15E";
        }
        
        readElement.addEventListener("click", (e) => {
            switch (book.read) {
                case "Read":
                    book.read = "Unread"
                    readElement.textContent = "Unread";
                    readElement.style.backgroundColor = "#DDA15E";
                    break;
                case "Unread":
                    book.read = "Read";
                    readElement.textContent = "Read";
                    readElement.style.backgroundColor = "#606C38";
                    break;
                default:
                    break;
            }
        })
        readElement.setAttribute("class", "read-button");

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.setAttribute("class", "remove-button");

        removeButton.addEventListener("click", () => {
            myLibrary.splice(myLibrary.indexOf(book), 1);
            refreshBookList();
        })

        buttonsContainer.appendChild(readElement);
        buttonsContainer.appendChild(removeButton);
        bookCard.appendChild(titleElement);
        bookCard.appendChild(authorElement);
        bookCard.appendChild(pagesElement);
        bookCard.appendChild(buttonsContainer);
        bookList.appendChild(bookCard);
    }
}

function showError(message) {
    const errorElement = document.createElement("div");
    errorElement.textContent = message;
    errorElement.classList.add("error-container");

    const closeButton = document.createElement("button");
    closeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close-thick</title><path d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z" /></svg>'
    closeButton.addEventListener("click", () => {
        errorElement.remove();
    })

    const existingError = dialog.querySelector(".error-container");
    if (existingError) {
        existingError.remove();
    }

    errorElement.appendChild(closeButton);    
    dialog.prepend(errorElement);
}

function refreshBookList() {
    bookList.innerHTML = "";

    createBookList();
}

addBookToLibrary(crypto.randomUUID(), "Atomic Habits", "James Clear", 320, "Read");
addBookToLibrary(crypto.randomUUID(), "Hobbit", "J.R.R. Tolkien", 420, "Unread");

refreshBookList();