// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import './App.css';
import BookList from './components/BookList';
import BookEdit from './components/BookEdit'; 

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={BookList} />
          <Route path="/update/:bookId" component={({ match }) => <BookEdit bookId={match.params.bookId} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;