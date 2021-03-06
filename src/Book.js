import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

    static propTypes = {
        book: PropTypes.object.isRequired,
        optList: PropTypes.array.isRequired,
        page: PropTypes.string.isRequired,
        updateShelves: PropTypes.func.isRequired
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

    componentWillReceiveProps(next_props) {
        let {book, page} = this.props;
        if (book === undefined) { return null; }
        let {shelf} = book;
        if (page === "search") {
            if (shelf !== undefined && shelf !== "none") {
                this.setState({ book_class: "book hide" });
            }
        }
    }


    handleChange(event) {
        let {book, page, updateShelves} = this.props,
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
        if (book === undefined || book === [] || authors === undefined) { return null; }
        let coverStyle, {book_class} = this.state;

        // handle books without cover images
        if (imageLinks !== undefined && imageLinks.smallThumbnail !== undefined) {
            coverStyle = {backgroundImage: `url(${imageLinks.smallThumbnail})`};
        } else {
            coverStyle = {backgroundImage: `url(https://dummyimage.com/128x154/666/fff.png&text=No+Image)`};
        }

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