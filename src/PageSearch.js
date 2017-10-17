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
            books: { error: "", items: [] }
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
        this.setState({ books: { error: "", items: [] } });
    }

    searchBooks() {
        let {query} = this.state,
            {maxResults} = this.props;

        BooksAPI.search(query, maxResults).then((books) => {
            if (books === undefined || books === []) {
                this.setState({ books: { error: "", items: [] } });
            } else if (books.error === undefined || books.error === "") {
                this.setState({ books: { error: "", items: books } });
            } else {
                this.setState({ books: books });
            }
            return books;
        }).then((books) => {
            if (books === undefined) {
                return undefined;
            } else if (books.error !== null && books.error !== undefined && books.error.length > 0) {
                return false;
            } else {
                return this.updateWithShelf();
            }
        });
    }

    updateWithShelf() {
        let {books} = this.state;
        if (books.error === "") {
            books.items.map((book, idx) => {
                BooksAPI.get(book.id).then((book) => {
                    books.items[idx].shelf = book.shelf;
                    this.setState({ books: books });
                });
                return true;
            });
        } else {
            return false;
        }
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