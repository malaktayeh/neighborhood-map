import React, { useState } from 'react';

function Sidebar() {
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
            </form>
        </div>
    )
}

export default Sidebar;