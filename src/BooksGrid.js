import React, { Component } from 'react';
import Book from './Book';

class BooksGrid extends Component {

    render() {
        const { books } = this.props;

        return books.length === 0 ? (
            <div className="no-results">No books</div>
        ) : (
            <ol className="books-grid">
                {books.map((book) => (
                    <li key={book.id}>
                        <Book book={book} />
                    </li>
                    )
                )}
            </ol>
        )
    }
}

export default BooksGrid