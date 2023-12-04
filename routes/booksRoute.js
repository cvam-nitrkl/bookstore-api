import express from "express";
import { Book } from "../models/bookModels.js";

const router = express.Router();

//route to create or add books in the database
router.post("/", async (req, res) => {
  const { name, author, publishDate, isbn, language } = req.body;
  try {
    if (!name || !author || !publishDate || !isbn || !language) {
      return res.status(400).send({
        message: "Send all required fields: name, author, publishDate",
      });
    }

    const newBook = {
      name,
      author,
      publishDate,
      isbn,
      language,
    };

    const book = await Book.create(newBook);
    return res.status(201).json({ message: "book created successfully", book:book });
  } catch (error) {
      console.error('Error in creating a new book:', error);
      if (error.name === 'MongoError' && error.code === 11000) {
      // error code for duplicate key
      res.status(400).json({ error: "duplicate entry", message: error.message });
    } 
    else {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  }
});

// route to get all books present in the database
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// Route to get One book from the database
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// route to update data in the database
router.put("/:id", async (req, res) => {
  const { name, author, publishDate, isbn, language } = req.body;
  try {
    if (!name || !author || !publishDate || !isbn || !language) {
      return res.status(400).send({
        message: "Send all required fields: name, author, publishDate",
      });
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send({ message: "Oops!, Book not Found" });
    }

    return res
      .status(200)
      .send({ message: "Hurray! Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// route to delete data from the database
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Book not Found" });
    }

    return res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
