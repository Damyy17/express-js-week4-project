const Book = require('../models/bookModel')
const Review = require('../models/reviewModel')
let reviewId= 0;

const books = [
    new Book(1, 'To Kill a Mockingbird', 'Harper Lee', '9780061120084', [
        new Review(1, "really good book, wow", 1, 1)
    ]),
    new Book(2, '1984', 'George Orwell', '9780451524935', []),
    new Book(3, 'Pride and Prejudice', 'Jane Austen', '9780141439518', []),
    new Book(4, 'The Catcher in the Rye', 'J.D. Salinger', '9780316769488', [])
  ];

exports.getAllBooks = async (request, response) => {
    await response.json(books);
}

exports.getBookById = (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);
    if (!book) {
        return res.status(404).json({
            message : 'Book not found'
        });
    }
    res.json(book);
}

exports.getBookReviews = (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find((b) => b.id === bookId)

    if (!book) {
        return res.status(404).json({
            message : 'Book not found'
        });
    }

    const reviews = book.reviews;
    res.json(reviews);
}

exports.postReview = (req, res) => {
    try {
        const reviewData = req.body;
        Review.validate(reviewData);

        const bookId = parseInt(reviewData.bookId);
        const book = books.find((b) => b.id === bookId);

        if (!book) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        reviewId++;
        const newReview = new Review(
            reviewId,
            reviewData.content,
            reviewData.bookId,
            reviewData.userId
        );

        book.reviews.push(newReview);

        res.status(201).json({
            message: 'Review added successfully'
        });

    } catch (error) {
        res.status(400).json({
            message: 'Invalid review data'
        });
    }
}

exports.deleteReview = (req, res) => {
    const reviewId = parseInt(req.params.id);

    // Find the book with the review
    const book = books.find(book => book.reviews.some(review => review.id === reviewId));

    if (!book) {
        return res.status(404).json({
            message : 'Review not found'
        });
    }

    // Filter out the review to be deleted
    book.reviews = book.reviews.filter(review => review.id !== reviewId);

    res.json({ message: 'Review deleted successfully' });
}

// Filter books by author
exports.getBooksByAuthor = (req, res) => {
    const author = req.params.author;
    const filteredBooks = books.filter(book => book.author.toLowerCase() === author.toLowerCase());

    res.json(filteredBooks);
}

// Filter books by ISBN
exports.getBooksByISBN = (req, res) => {
    const isbn = req.params.isbn;
    const filteredBooks = books.filter(book => book.isbn === isbn);

    res.json(filteredBooks);
}

// Filter books by title
exports.getBooksByTitle = (req, res) => {
    const title = req.params.title;
    const filteredBooks = books.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));

    res.json(filteredBooks);
}

