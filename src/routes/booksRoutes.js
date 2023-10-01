var express = require('express');
const router = express.Router();

const booksController = require('../controller/booksController')

router.get('/books', booksController.getAllBooks)

router.get('/books/:id', booksController.getBookById)

router.get('/books/:id/reviews', booksController.getBookReviews)

router.post('/books/:id/reviews', booksController.postReview)

router.delete('/books/:id/reviews/:id', booksController.deleteReview)

router.get('/books/author/:author', booksController.getBooksByAuthor);

router.get('/books/isbn/:isbn', booksController.getBooksByISBN);

router.get('/books/title/:title', booksController.getBooksByTitle);

module.exports = router;
