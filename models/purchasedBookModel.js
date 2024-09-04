import mongoose from 'mongoose';

const PurchasedBookSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Add userId field
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  coverImage: { type: String },
  purchasedAt: { type: Date, default: Date.now },
  razorpay_order_id: { type: String, required: true },
  razorpay_payment_id: { type: String, required: true },
});

const PurchasedBook = mongoose.model('PurchasedBook', PurchasedBookSchema);

export default PurchasedBook;
