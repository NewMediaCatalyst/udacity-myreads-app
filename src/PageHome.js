import React, { Component } from 'react';
import {Link} from 'react-router-dom';

// eslint-disable-next-line
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf';
import AppHeader from './AppHeader';

class PageHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shelves: [
                {id: "currentlyReading", title: "Currently Reading", books: []},
                {id: "wantToRead", title: "Want to Read", books: []},
                {id: "read", title: "Read", books: []}
            ]
        };
    }

    componentDidMount() {
        let {shelves} = this.state;
        BooksAPI.getAll().then((bookset) => {
            bookset.forEach((book) => {
                let {shelf} = book;
                for(let i = 0; i < shelves.length; i++) {
                    if (shelf === shelves[i].id) {
                        shelves[i].books.push(book);
                    }
                }
            });
            this.setState({ shelves: shelves });
        });
    }

    render() {
        const { shelves } = this.state;

        return (
            <div className="list-books">
                <AppHeader />
                <main className="list-books-content" role="main">
                    <div>{shelves.map((shelf) => <BookShelf key={shelf.id} title={shelf.title} books={shelf.books} />)}</div>
                </main>
                <footer className="open-search">
                    <Link to="/search" title="Add a book">Add a book</Link>
                </footer>
            </div>
        )
    }
}

export default PageHome