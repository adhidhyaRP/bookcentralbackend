import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';
import PurchasedBook from '../models/purchasedBookModel.js';

dotenv.config();

const paymentRouter = express.Router();
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
paymentRouter.post('/create-order', async (req, res) => {
  const { amount, currency, book } = req.body;

  const options = {
    amount: amount * 100, 
    currency: currency,
    receipt: crypto.randomBytes(10).toString('hex'),
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
      book,
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong in creating order' });
  }
});
paymentRouter.post('/save-purchase', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, book, userId } = req.body;

  try {
    const purchasedBook = new PurchasedBook({
      ...book,
      razorpay_order_id,
      razorpay_payment_id,
      userId, 
    });
    await purchasedBook.save();
    res.json({ message: 'Book purchased successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save purchased book' });
  }
});


export default paymentRouter;
