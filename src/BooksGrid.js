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
        books: PropTypes.object.isRequired,
        page: PropTypes.string.isRequired,
        updateShelves: PropTypes.func
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.books.items !== undefined && nextProps.books.items.length >= 0) {
            this.setState({ loading: false });
        }
    }

    renderResults() {
        const {books, page, updateShelves} = this.props;

        return <ol className="books-grid">
            {books.items.map((book) => (
                <li key={book.id}>
                    <Book updateShelves={updateShelves} page={page} book={book} />
                </li>
                )
            )}
        </ol>
    }

    renderNoResults() {
        const {books, page} = this.props;
        let link = null,
            text = "",
            {loading} = this.state;

        if (page !== "search") {
            if (loading && books.error === "") { // first load AND no errors
                text = "Loading books...";
            } else if (!loading && books.error !== "") { // not first load AND errors
                text = books.error;
            } else { // not first load AND no results
                text = "No books in this shelf! ";
                link = <Link to="/search">Add a book &raquo;</Link>
            }
        } else {
            if (loading && books.error === "") { // first load AND no errors
                text = "Use the search field to find books.";
            } else if (!loading && books.error !== "") {
                text = books.error === "empty query" ?
                    "No results from query. Please retry your search." : books.error;
            } else {
                text = "Use the search field to find books.";
            }
        }

        return <div className="no-results">
            {text}
            {link}
        </div>
    }

    render() {
        const {books} = this.props;

        if (books.items !== null
            && books.items !== undefined
            && books.items.length > 0) {
                return this.renderResults();
        } else {
            return this.renderNoResults();
        }

    }
}

export default BooksGrid