// models/Book.js

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publication_year: {
    type: Number,
    required: true,
  },
  genre: {
    type: [String],
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  cover_image: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Book', bookSchema);
