// src/components/BookList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BookList.css'; // Add a CSS file for styling

function BookList() {
  const [books, setBooks] = useState([]);
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');

  const fetchBooks = () => {
    fetch('/book/all')
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    fetchBooks();

    const intervalId = setInterval(() => {
      fetchBooks();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []); 

  const handleDelete = (bookId) => {
    axios.post(`/book/delete/${bookId}`)
      .then(() => {
        setBooks(books.filter(book => book.id !== bookId));
      })
      .catch(error => {
        alert('Error deleting book:', error);
      });
  };

  const handleSave = () => {
    const newBook = {
      author,
      title,
      genre
    };

    axios.post('/book/add', newBook)
      .then(response => {
        setBooks([...books, response.data]);
        setAuthor('');
        setTitle('');
        setGenre('');
      })
      .catch(error => {
        alert('Error saving book:', error);
      });
  };

  return (
    <div className="book-list-container">
      <h1>Book List</h1>
      <table className="book-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Author</th>
            <th>Title</th>
            <th>Genre</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.author}</td>
              <td>{book.title}</td>
              <td>{book.genre}</td>
              <td>
                <button className="delete-button" onClick={() => handleDelete(book.id)}>Delete</button>
                <Link to={`/update/${book.id}`} className="edit-link">Edit</Link> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Add New Book</h2>
      <div className="add-book-form">
        <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
        <button className="save-button" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default BookList;