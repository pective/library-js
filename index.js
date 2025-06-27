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
