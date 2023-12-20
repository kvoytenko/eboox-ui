// src/components/BookEdit.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookEdit({ bookId }) {
  const [book, setBook] = useState({});
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');

  useEffect(() => {
    axios.get('/book/' + bookId)
      .then(response => {
        setBook(response.data);
        setAuthor(response.data.author);
        setTitle(response.data.title);
        setGenre(response.data.genre);
      })
      .catch(error => {
        alert('Error fetching book data:', error);
      });
  }, [bookId]);

  const handleUpdate = () => {
    const updatedBook = {
      ...book,
      author,
      title,
      genre
    };

    axios.post('/book/update/' + bookId, updatedBook)
      .then(() => {
        alert('Book updated successfully');
      })
      .catch(error => {
        alert('Error updating book:', error);
      });
  };

  return (
    <div>
      <h1>Edit Book</h1>
      <div>
        <label>Author:</label>
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
      </div>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Genre:</label>
        <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
      </div>
      <button onClick={handleUpdate}>Update</button>
      <a href='/'>Home page</a>
    </div>
  );
}

export default BookEdit;