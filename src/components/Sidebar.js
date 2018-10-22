import React from "react";
import './../App.css';
// import escapeRegExp from 'escape-string-regexp';
// import { DebounceInput } from 'react-debounce-input';

class SideBar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        };
    }

    // filterResults() {
    //     const match = new RegExp(escapeRegExp(this.state.query), 'i');
    //     // match query with book title or book author
    //     this.setState((state) => {
    //         this.state.books.filter((book) =>
    //             match.test(book.title) || match.test(book.authors)
    //         )
    //     })
    // }

    render() {
        return (
                <div id="sidebar">
                    <div>
                        <form id="input-form">
                            <input
                                type="text"
                                placeholder="Enter new search here"
                                onChange={(event) => { this.setState({ query: event.target.value }) }}
                            />
                            <button onClick={() => this.props.getData(this.state.query)}>Search</button>
                        </form>
                        <hr/>
                        <div id="filter-list">
                            <input
                                type="text"
                                placeholder="Enter new search here"
                            />
                            <button>Filter</button>
                        </div>
                        <hr />
                        <div id="locations-list">
                            <h3>Search results</h3>
                                {Object.keys(this.props.markers).length < 1 ? (
                                    <div>
                                        <p>No results found. Search again.</p>
                                    </div>
                                ) : (
                                    <ul>
                                        {Object.entries(this.props.markers).map(([key, value]) =>
                                            <a href='#' key={key} onClick={() => this.props.handleMarkerClick(key)}>
                                                <li> {value.title} </li>
                                            </a>
                                        )}
                                    </ul>
                                    ) }
                        </div>
                    </div>
                </div>
        )
    }
}

export default SideBar;