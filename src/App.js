import React, { Component } from 'react';

import PageSearch from './PageSearch.js'
import PageHome from './PageHome.js'
import './App.css'

// TODO: implement method to catch both URLs
// eslint-disable-next-line
const SEARCH_URL = ['/search', '/search/'];

class BooksApp extends Component {
  state = {
    showSearchPage: window.location.pathname === '/search'
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (<PageSearch />) : (<PageHome />)}
      </div>
    )
  }
}

export default BooksApp
