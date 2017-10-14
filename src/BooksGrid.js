import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import Book from './Book';


class BooksGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    static propTypes = {
        books: PropTypes.array.isRequired,
        page: PropTypes.string.isRequired,
        updateShelves: PropTypes.func
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.books !== undefined && nextProps.books.length >= 0) {
            this.setState({ loading: false });
        }
    }

    render() {
        const {books, page, updateShelves} = this.props;
        let link = null, text = "Loading books...",
            {loading} = this.state;

        if (books !== null && books !== undefined && books.length > 0) {
            return <ol className="books-grid">
                {books.map((book) => (
                    <li key={book.id}>
                        <Book
                            updateShelves={updateShelves}
                            page={page}
                            book={book}
                        />
                    </li>
                    )
                )}
            </ol>
        }

        if (!loading) {
            if (page === "home" || page === undefined) {
                link = <Link to="/search">Add a book &raquo;</Link>
            }
            text = "No books, currently! ";
        }

        return <div className="no-results">
            {text}
            {link}
        </div>
    }
}

export default BooksGrid