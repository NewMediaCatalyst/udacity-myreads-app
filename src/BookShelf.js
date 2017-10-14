import React, { Component } from 'react';
import BooksGrid from './BooksGrid';

class BookShelf extends Component {

    render() {
        const {title, books, page, updateShelves} = this.props;
        let heading = title;

        if (books !== undefined && books.length > 0) {
            heading += ` (${books.length})`;
        }

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{heading}</h2>
                <div className="bookshelf-books">
                    <BooksGrid
                        page={page}
                        title={title}
                        books={books}
                        updateShelves={updateShelves}
                    />
                </div>
            </div>
        )
    }
}

export default BookShelf