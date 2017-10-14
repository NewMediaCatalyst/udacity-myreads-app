import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import * as BooksAPI from './BooksAPI'
import BooksGrid from './BooksGrid';
import AppHeader from './AppHeader';

class PageSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: "",
            books: []
        };
    }

    static propTypes = {
        maxResults: PropTypes.number.isRequired
    }

    static defaultProps = {
        maxResults: 10
    }

    updateQuery(query) {
        this.setState({ query: query });
        if (query === '') {
            this.clearBooks();
        } else {
            this.searchBooks();
        }
    }

    clearBooks() {
        this.setState({ books: [] });
    }

    searchBooks() {
        let {query} = this.state,
            {maxResults} = this.props;

        BooksAPI.search(query, maxResults).then((books) => {
            if (books === undefined) { return null; }
            if (books.error === undefined) {
                books.error = false;
            }
            this.setState({ books: books });
            return true;
        }).then(() => this.updateWithShelf() );
    }

    updateWithShelf() {
        let {books} = this.state;
        books.map((book, idx) => {
            BooksAPI.get(book.id).then((book) => {
                books[idx].shelf = book.shelf;
                this.setState({ books: books});
            });
            return true;
        });
    }

    render() {
        const {books, query} = this.state;

        return (
            <div className="search-books">
                <AppHeader />
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            onChange={(ev) => this.updateQuery(ev.target.value)}
                            autoFocus={true}
                            value={query}
                            type="text"
                            placeholder="Search by title or author"
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <BooksGrid page="search" books={books} />
                </div>
            </div>
        )
    }
}

export default PageSearch