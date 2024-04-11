const axios = require('axios');
const mongoose = require('mongoose');
const Book = require('./models/Books'); // Import your Book model

// MongoDB Connection URI
const mongoUri = 'mongodb://localhost:27017/bookdb'; // Update with your MongoDB connection URI

// Function to fetch data from the API endpoint and insert it into MongoDB
async function fetchDataAndInsert() {
  try {
    // Fetch data from the API endpoint
    const response = await axios.get('https://freetestapi.com/api/v1/books');
    const books = response.data;

    // Connect to MongoDB
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Insert fetched data into MongoDB collection
    await Book.insertMany(books);
    console.log('Data inserted successfully');

    // Close MongoDB connection
    mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the function to fetch and insert data
fetchDataAndInsert();
