import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  coverImage: { type: String }
});

const Book =  mongoose.model('Book', BookSchema);
export default Book