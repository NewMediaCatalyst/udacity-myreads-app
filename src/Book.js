import React, { Component } from 'react';

class Book extends Component {

    render() {
        const {book} = this.props,
              {title, authors, imageLinks} = book,
              {smallThumbnail} = imageLinks,
              coverStyle = {backgroundImage: `url(${smallThumbnail})`};
        console.log("authors: ", authors);
        const authorList = authors.map((author, idx, authors) => {
            const len = authors.length;
            if (len > 1 && idx < len - 1) {
                return `${author}; `;
            } else {
                return author;
            }
        });
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={coverStyle}></div>
                    <div className="book-shelf-changer">
                        <select>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <h3 className="book-title">{title}</h3>
                <p className="book-authors">{authorList}</p>
            </div>
        )
    }
}

export default Book