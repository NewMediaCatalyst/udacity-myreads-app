import React, { Component } from 'react';
// eslint-disable-next-line
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf';

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
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
            	<div>{shelves.map((shelf) => <BookShelf key={shelf.id} title={shelf.title} books={shelf.books} />)}</div>
            </div>
            <div className="open-search">
              <a href="/search">Add a book</a>
			</div>
          </div>
      )
  }
}

export default PageHome