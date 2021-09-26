import React, { useState } from 'react';
import './sidebar.css';

const Sidebar = ({ getData }) => {
    const [queryString, setQueryString] = useState("");

    return(
        <div id="sidebar">
            <form id="input-form" aria-label="search">
                <input
                    aria-label={"Search Box"}
                    aria-required="true"
                    type="text"
                    placeholder="Enter new search here"
                    onChange={(event) => { setQueryString(event.target.value) }}
                />
            <button role="button" aria-label="Search" onClick={(e) => getData(e, queryString)}>Search</button>
            </form>
        </div>
    )
}

export default Sidebar;