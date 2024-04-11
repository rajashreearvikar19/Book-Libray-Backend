const express = require('express');
const router = express.Router();
const Book = require('../models/Books');

// GET all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a particular book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findOne({ id: req.params.id });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// POST a new book
router.post('/', async (req, res) => {
  const booksData = req.body;

  try {
    // If booksData is an array, insert multiple books
    if (Array.isArray(booksData)) {
      const newBooks = [];
      for (const bookData of booksData) {
        // Check if a book with the same id already exists
        const existingBook = await Book.findOne({ id: bookData.id });
        if (existingBook) {
          // If a book with the same id exists, skip it and proceed to the next book
          continue;
        }
        // Create a new book with the provided data
        const book = new Book(bookData);
        // Save the new book to the database
        const newBook = await book.save();
        newBooks.push(newBook);
      }
      return res.status(201).json(newBooks);
    } else {
      // If booksData is not an array, insert a single book
      const bookData = booksData;
      // Check if a book with the same id already exists
      const existingBook = await Book.findOne({ id: bookData.id });
      if (existingBook) {
        return res.status(400).json({ message: "A book with the provided id already exists" });
      }
      // Create a new book with the provided data
      const book = new Book(bookData);
      // Save the new book to the database
      const newBook = await book.save();
      return res.status(201).json(newBook);
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});


// PUT(update) a book
router.put('/:id', async (req, res) => {
  const bookId = req.params.id;
  try {
    const updatedBook = await Book.findOneAndUpdate(
      { id: bookId },
      req.body,
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// DELETE a book
router.delete('/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findOneAndDelete({ id: req.params.id });
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
