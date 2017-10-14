import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import PageSearch from './PageSearch.js';
import PageHome from './PageHome.js';
import './App.css';


class BooksApp extends Component {

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
