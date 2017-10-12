import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import PageSearch from './PageSearch.js';
import PageHome from './PageHome.js';
import './App.css';

// TODO: implement method to catch both URLs
// eslint-disable-next-line
const SEARCH_URL = ['/search', '/search/'];

class BooksApp extends Component {

    state = {
        showSearchPage: window.location.pathname === '/search'
    }

    render() {
        return (
            <Router>
                <div className="app">
                    <Route exact path="/" component={PageHome} />
                    <Route path="/search" component={PageSearch} />
                </div>
            </Router>
        )
    }
}

export default BooksApp
