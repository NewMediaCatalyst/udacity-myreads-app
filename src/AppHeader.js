import React, { Component } from 'react';

class AppHeader extends Component {

    static defaultProps = {
        appTitle: "MyReads"
    }

    render() {
        const {appTitle} = this.props;

        return (
            <header className="list-books-title" role="banner">
                <h1>{appTitle}</h1>
            </header>
        )
    }
}

export default AppHeader