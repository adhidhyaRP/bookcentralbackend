import express from 'express';
import Cart from '../models/CartSchema.js';
import PurchasedBook from '../models/purchasedBookModel.js';

const cart = express.Router();


cart.post('/cart/:userId', async (req, res) => {
  try {


    // console.log(req.params.userId)
    const userId = req.params.userId; 
    const newCartItem = new Cart({ ...req.body, userId }); 
    const savedItem = await newCartItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


cart.get('/cart/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const cartItems = await Cart.find({ userId }); 
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


cart.post('/purchased', async (req, res) => {
  try {
    
    const userId = req.body.userId; 
    const purchasedBook = new PurchasedBook({ ...req.body, userId }); 
    const savedBook = await purchasedBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


cart.get('/purchased/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const purchasedBooks = await PurchasedBook.find({ userId }); 
    res.json(purchasedBooks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


cart.delete('/cart/:id/:userId', async (req, res) => {
  try {
    const { id, userId } = req.params;
    await Cart.findOneAndDelete({ _id: id, userId }); 
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default cart;
