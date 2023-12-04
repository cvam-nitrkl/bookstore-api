import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
  name: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    type: String,
    required: true,
  },
  publishDate: {
    type: Number,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
    unique: true
  },
  language: {
    type: String,
    required: true
  }
}
);

export const Book = mongoose.model('Book', bookSchema);
