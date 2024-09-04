import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Add userId field
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  coverImage: { type: String }
});

const Cart = mongoose.model('Cart', CartSchema);

export default Cart;
