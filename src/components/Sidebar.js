import React from "react";
import './../App.css';

class SideBar extends React.PureComponent {

    render() {
        return (
            <div id="sidebar">
                <div id="input-form">
                    <input></input>
                    <button>Search</button>
                </div>
                <hr/>
                <div id="filter-list">
                    <input></input>
                    <button>Filter</button>
                </div>
                <hr />
                <div id="locations-list">
                    <h3>Search results</h3>
                    <ul>
                        { Object.entries(this.props.markers).map(([key, value]) => 
                            <a href='#' key={key} onClick={() => this.props.handleMarkerClick(key)}>
                                <li> {value.title} </li>
                            </a>
                        )}
                    </ul>
                </div>
            </div>
        )
    }
}

export default SideBar;