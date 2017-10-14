import React, { Component } from 'react';

import * as BooksAPI from './BooksAPI';


class Book extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.updateShelves = this.props.updateShelves.bind(this);
        this.state = {
            book_class: "book"
        }
    }

    static defaultProps = {
        updateShelves: () => {},
        optList: [
            {val: "none", text: "Move to..."},
            {val: "currentlyReading", text: "Currently Reading"},
            {val: "wantToRead", text: "Want to Read"},
            {val: "read", text: "Read"},
            {val: "none", text: "None"}
        ]
    }

    handleChange(event) {
        const {book, page, updateShelves} = this.props,
            val = event.target.value;
        if (val === "none" && page === "search") {
            this.setState({ book_class: "book"});
        } else {
            this.setState({ book_class: "book hide"});
        }

        BooksAPI.update(book, val).then((res) => res);

        if (page !== undefined && page === "home") {
            updateShelves(book);
        }

    }

    render() {
        let {book, optList} = this.props,
            {title, authors, imageLinks, shelf} = book;
        if (book === undefined || authors === undefined) { return null; }
        let {smallThumbnail} = imageLinks,
            {book_class} = this.state,
            coverStyle = {backgroundImage: `url(${smallThumbnail})`};

        const authorList = authors.map((author, idx, authors) => {
            const len = authors.length;
            if (len > 1 && idx < len - 1) {
                return `${author}; `;
            } else {
                return author;
            }
        });
        const opts = optList.map((option, idx) => {
            const {val, text} = option;
            let attrs = {
                value: val,
                key: `${val.split(" ").join("").toLowerCase()}-${idx}`
            };
            if (idx === 0) { attrs.disabled = true; }
            return <option {...attrs}>{text}</option>
        });


        return (
            <div className={book_class}>
                <div className="book-top">
                    <div className="book-cover" style={coverStyle}></div>
                    <div className="book-shelf-changer">
                        <select value={shelf ? shelf : 'none'} onChange={this.handleChange} children={opts} />
                    </div>
                </div>
                <h3 className="book-title">{title}</h3>
                <p className="book-authors">{authorList}</p>
            </div>
        )
    }
}

export default Book