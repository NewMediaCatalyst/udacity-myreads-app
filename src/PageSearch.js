import React, { Component } from 'react';
// eslint-disable-next-line
import * as BooksAPI from './BooksAPI'
import BooksGrid from './BooksGrid';

class PageSearch extends Component {

 	constructor(props) {
        super(props);
        this.state = {
            query: "",
            books: []
        };
    }
  
  	static defaultProps = {
    	maxResults: 10
    }

    componentDidMount() {
      	/*
        BooksAPI.getAll().then((books) => {
            this.setState({ books: books });
            console.log("books: ", books);
        });
        */
    }

    updateQuery = (query) => {
        this.setState({ query: query });
      	if (query === '') {
        	this.clearBooks();
        } else {
        	this.searchBooks();
        }
      	
    }

    searchBooks = () => {
      	let {query} = this.state,
            {maxResults} = this.props;

      	BooksAPI.search(query, maxResults).then((books) => {
        	this.setState({ books: books });
        })
   	}

	clearBooks = () => {
   		this.setState({ books: [] });
    }

    render() {
      const {books, query} = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <a href="/" className="close-search">Close</a>
                    <div className="search-books-input-wrapper">
                        <input
                            onChange={(ev) => this.updateQuery(ev.target.value)}
                            value={query}
                            type="text"
                            placeholder="Search by title or author"
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <BooksGrid books={books} />
                </div>
            </div>
        )
    }
}

export default PageSearch