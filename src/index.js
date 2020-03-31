import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@reach/router'
import './index.css'
import * as serviceWorker from './serviceWorker'

import Front from './pages/Front';
import SearchResults from './pages/SearchResults'
import Person from './pages/Person'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Front path="/" />
      <SearchResults path="/search/:query" />
      <Person path="/person/:id" />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
