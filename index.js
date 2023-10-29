const express = require("express")
const cors = require("cors");
const connectDb = require("./connection/db")
const dotenv = require("dotenv").config()
const app = express();
const book = require("./model/bookSchema")

console.log(process.env.PORT);
app.use(cors());
app.use(express.json());
connectDb();


app.post('/api/addBooks', (req, res) => {
    // Create a new book instance from the request body
    const newBook = new book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
    });
  
    // Save the book document to the database using a promise
    newBook.save()
      .then(book => {
        res.json(book); // Respond with the newly created book
      })
      .catch(err => {
        res.status(500).json({ error: 'Failed to add a new book' });
      });
  });

  app.get('/api/getallBooks', (req, res) => {
    // Use the `find` method to retrieve all books and use a Promise
    book.find({})
      .then(books => {
        res.json(books);
      })
      .catch(err => {
        console.error('Error fetching books:', err);
        res.status(500).json({ error: 'Failed to fetch books' });
      });
  });
  app.get('/getAllBooks/:id', (req, res) => {
    const bookId = req.params.id;
  
    // Use the `findById` method to retrieve a book by its unique ID
    book.findById(bookId)
      .then(book => {
        if (!book) {
          return res.status(404).json({ error: 'Book not found' });
        }
        res.json(book);
      })
      .catch(err => {
        console.error('Error fetching book by ID:', err);
        res.status(500).json({ error: 'Failed to fetch the book' });
      });
  });

  app.put('/api/updateBooks/:id', (req, res) => {
    const bookId = req.params.id;
  
    // Use the `findByIdAndUpdate` method to find and update a book by its unique ID
    book.findByIdAndUpdate(bookId, req.body, { new: true })
      .then(updatedBook => {
        if (!updatedBook) {
          return res.status(404).json({ error: 'Book not found' });
        }
        res.json(updatedBook);
      })
      .catch(err => {
        console.error('Error updating book by ID:', err);
        res.status(500).json({ error: 'Failed to update the book' });
      });
  });
  app.delete('/api/deleteBooks/:id', (req, res) => {
    const bookId = req.params.id;
  
    // Use the `findByIdAndRemove` method to find and remove a book by its unique ID
    book.findByIdAndRemove(bookId)
      .then(deletedBook => {
        if (!deletedBook) {
          return res.status(404).json({ error: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' });
      })
      .catch(err => {
        console.error('Error deleting book by ID:', err);
        res.status(500).json({ error: 'Failed to delete the book' });
      });
  });
  
  
  
  
  








let PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server Running on => `, PORT);
});
