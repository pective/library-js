const myLibrary = [];

function Book(id, title, author, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

console.log(myLibrary);

const bookList = document.querySelector(".book-list");

const dialog = document.querySelector("dialog");

document.querySelector(".book-add").addEventListener("click", () => {
    dialog.showModal();
});

document.querySelector(".dialog-book-add").addEventListener("click", () => {
    const bookTitle = document.querySelector("input[id=title]").value;
    const bookAuthor = document.querySelector("input[id=author]").value;
    const bookPages = document.querySelector("input[id=pages]").value;
    let bookRead = document.querySelector("input[id=read]").checked;

    if(bookRead) {
        bookRead = "read";
    } else {
        bookRead = "unread";
    }
    
    addBookToLibrary(crypto.randomUUID(), bookTitle, bookAuthor, bookPages, bookRead);

    dialog.close();
});

document.querySelector(".cancel").addEventListener("click", () => {
    dialog.close();
});


function addBookToLibrary(id, title, author, pages, read) {
  const book = new Book(id, title, author, pages, read);
  myLibrary.push(book);

  createBookList();
}

function createBookList() {
    for(let book of myLibrary) {
        const bookCard = document.createElement("div");
        bookCard.setAttribute("class", "book-card");

        const titleElement = document.createElement("h4");
        titleElement.textContent = `${book.title}`;

        const authorElement = document.createElement("h4");
        authorElement.textContent = `${book.author}`;

        const pagesElement = document.createElement("p");
        pagesElement.textContent = `${book.pages}`;

        const readElement = document.createElement("button");
        readElement.textContent = book.read;
        if(readElement.textContent === "read") {
                readElement.textContent = "unread";
                book.read = "unread"
                readElement.style.backgroundColor = "#DDA15E";
                
            } else {
                readElement.textContent = "read";
                book.read = "read";
                readElement.style.backgroundColor = "#606C38";
                 
            }
        readElement.textContent = `${book.read}`;
        
        readElement.addEventListener("click", (e) => {
            switch (book.read) {
                case "read":
                    book.read = "unread"
                    readElement.textContent = "unread";
                    readElement.style.backgroundColor = "#DDA15E";
                    break;
                case "unread":
                    book.read = "read";
                    readElement.textContent = "read";
                    readElement.style.backgroundColor = "#606C38";
                    break;
            
                default:
                    break;
            }
        })

        readElement.setAttribute("class", "read-button");


        bookCard.appendChild(titleElement);
        bookCard.appendChild(authorElement);
        bookCard.appendChild(pagesElement);
        bookCard.appendChild(readElement);
        bookList.appendChild(bookCard);
    }
}

function refreshBookList() {
    bookList.innerHTML = "";

    createBookList();
}

addBookToLibrary(crypto.randomUUID(), "Atomic Habits", "James Clear", 320, "read");
addBookToLibrary(crypto.randomUUID(), "Hobbit", "J.R.R. Tolkien", 420, "unread");

refreshBookList();