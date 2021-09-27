import React, { useState } from 'react';
import Locations from './Locations';
import Search from './Search';
import './sidebar.css';

const Sidebar = ({ getData, markers }) => {

    return(
        <div id="sidebar">
            <Search getData={getData} />

            {/* List of locations */}
            <Locations markers={markers} />
        </div>
    )
}

export default Sidebar;