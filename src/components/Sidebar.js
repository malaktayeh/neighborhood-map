import React from "react";
import './../App.css';

class SideBar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            filterQuery: ''
        };
    }

    render() {
        return (
                <div id="sidebar">
                    <div>
                        <form id="input-form">
                            <input
                                aria-label={'Search Box'}
                                aria-required="true"
                                type="text"
                                placeholder="Enter new search here"
                                onChange={(event) => { this.setState({ query: event.target.value }) }}
                            />
                            <button onClick={() => this.props.getData(this.state.query)}>Search</button>
                        </form>
                        <hr/>
                        <form id="filter-list">
                            <input
                                type="text"
                                placeholder="Filter results"
                                onChange={event => { this.setState({ filterQuery: event.target.value }) }}
                            />
                        <button onClick={() => this.props.filterData(this.state.filterQuery)}>Filter</button>
                        </form>
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