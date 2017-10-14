import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf';
import AppHeader from './AppHeader';

class PageHome extends Component {

    constructor(props) {
        super(props);
        this.updateShelves = this.updateShelves.bind(this);
        this.state = {
            shelves: this.initShelves()
        };
    }

    componentDidMount() {
        this.updateShelves();
    }

    initShelves() {
        return [
            {id: "currentlyReading", title: "Currently Reading", books: []},
            {id: "wantToRead", title: "Want to Read", books: []},
            {id: "read", title: "Read", books: []}
        ]
    }

    updateShelves(item) {
        let shelves = this.initShelves();

        let updateBooks = () => {
            BooksAPI.getAll().then((bookset) => {
                bookset.forEach((book) => {
                    let {shelf} = book;
                    for (let i = 0; i < shelves.length; i++) {
                        if (shelf === shelves[i].id) {
                            shelves[i].books.push(book);
                        }
                    }
                });
                this.setState({ shelves: shelves });
            });
        }
        setTimeout(updateBooks, 500);
    }

    renderShelves() {
        let { shelves } = this.state;
        return shelves.map((shelf) => {
            return <BookShelf
                key={shelf.id}
                title={shelf.title}
                books={shelf.books}
                updateShelves={this.updateShelves}
                page="home"
            />
        });
    }

    render() {
        return (
            <div className="list-books">
                <AppHeader />
                <main className="list-books-content" role="main">
                    {this.renderShelves()}
                </main>
                <footer className="open-search">
                    <Link to="/search" title="Add a book">Add a book</Link>
                </footer>
            </div>
        )
    }
}

export default PageHome