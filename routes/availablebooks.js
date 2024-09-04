import express from 'express'
import Book from '../models/bookmodel.js'

const book = express.Router()

book.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});



export default book