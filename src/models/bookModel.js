class Book {
    constructor (id, title, author, isbn, reviews){
        this.id = id;
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.reviews = reviews;
    }

    static validate(bookData) {
        if (!bookData.title || !bookData.author || !bookData.isbn || !bookData.reviews ) {
            throw new Error("Some book data is missing")
        }
    }
}

module.exports = Book;