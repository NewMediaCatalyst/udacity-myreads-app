import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import Book from './Book';


class BooksGrid extends Component {

    render() {
        const {books, page, updateShelves} = this.props;
        // if (books === undefined) { return null; }
        let link = null;

        if (books !== undefined && books.length > 0) {
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
        if (page === "home" || page === undefined) {
            link = <Link to="/search">Add a book now &raquo;</Link>
        }
        return <div className="no-results">
            {"No books, currently! "}
            {link}
        </div>
    }
}

export default BooksGrid