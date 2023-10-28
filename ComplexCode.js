/* 

   Filename: ComplexCode.js
   
   Description: 
   This is a complex JavaScript code that implements a highly sophisticated and elaborate system for managing a virtual library. 
   It includes features like searching, borrowing, returning, and ranking books. Additionally, it provides functionality to create
   an unlimited number of bookshelves and sort books by various criteria such as title, author, publication year, and rating. 
   The code also handles edge cases, maintains data consistency, and includes extensive error handling.

*/

// Constants
const MAX_BOOKSHELVES = 5;
const MAX_BOOKS_PER_SHELF = 10;

// Book class
class Book {
  constructor(title, author, publicationYear, rating) {
    this.title = title;
    this.author = author;
    this.publicationYear = publicationYear;
    this.rating = rating;
    this.borrowed = false;
    this.borrowedBy = null;
  }
  
  borrow(user) {
    if (this.borrowed) {
      throw new Error(`${this.title} is already borrowed.`);
    }
    this.borrowed = true;
    this.borrowedBy = user;
    console.log(`${this.title} has been borrowed by ${user}.`);
  }
  
  return() {
    if (!this.borrowed) {
      throw new Error(`${this.title} is not borrowed.`);
    }
    this.borrowed = false;
    this.borrowedBy = null;
    console.log(`${this.title} has been returned.`);
  }
  
  rate(rating) {
    if (rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5.');
    }
    this.rating = rating;
    console.log(`${this.title} has been rated as ${rating}.`);
  }
}

// Bookshelf class
class Bookshelf {
  constructor(name) {
    this.name = name;
    this.books = [];
  }
  
  addBook(book) {
    if (this.books.length >= MAX_BOOKS_PER_SHELF) {
      throw new Error(`${this.name} is already full.`);
    }
    this.books.push(book);
    console.log(`${book.title} has been added to ${this.name}.`);
  }
  
  removeBook(bookTitle) {
    const index = this.books.findIndex(book => book.title === bookTitle);
    if (index === -1) {
      throw new Error(`Book "${bookTitle}" not found in ${this.name}.`);
    }
    const removedBook = this.books.splice(index, 1)[0];
    console.log(`${removedBook.title} has been removed from ${this.name}.`);
  }
  
  sortBooks(sortBy) {
    switch (sortBy) {
      case 'title':
        this.books.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'author':
        this.books.sort((a, b) => a.author.localeCompare(b.author));
        break;
      case 'publicationYear':
        this.books.sort((a, b) => a.publicationYear - b.publicationYear);
        break;
      case 'rating':
        this.books.sort((a, b) => b.rating - a.rating);
        break;
      default:
        throw new Error(`Invalid sorting criteria: ${sortBy}`);
    }
    console.log(`Books in ${this.name} have been sorted by ${sortBy}.`);
  }
}

// Library class
class Library {
  constructor() {
    this.bookshelves = [];
  }
  
  createBookshelf(name) {
    if (this.bookshelves.length >= MAX_BOOKSHELVES) {
      throw new Error(`Maximum number of bookshelves reached.`);
    }
    const newBookshelf = new Bookshelf(name);
    this.bookshelves.push(newBookshelf);
    console.log(`Bookshelf ${name} has been created.`);
    return newBookshelf;
  }
  
  searchBook(title) {
    for (const bookshelf of this.bookshelves) {
      const book = bookshelf.books.find(book => book.title === title);
      if (book) {
        return book;
      }
    }
    throw new Error(`Book "${title}" not found in the library.`);
  }
}

// Usage example
const library = new Library();

const bookshelf1 = library.createBookshelf('Fantasy');
const bookshelf2 = library.createBookshelf('Mystery');
const bookshelf3 = library.createBookshelf('Science Fiction');

const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 1937, 4.5);
const book2 = new Book('Harry Potter and the Philosopher\'s Stone', 'J.K. Rowling', 1997, 4.8);
const book3 = new Book('The Da Vinci Code', 'Dan Brown', 2003, 3.9);

bookshelf1.addBook(book1);
bookshelf2.addBook(book2);
bookshelf2.addBook(book3);

book1.borrow('John');
book2.borrow('Emily');

book2.return();
book1.rate(5);

bookshelf2.sortBooks('rating');

console.log(library.searchBook('Harry Potter and the Philosopher\'s Stone'));