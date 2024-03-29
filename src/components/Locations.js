import React from 'react';

const Locations = ({ markers }) => {
    return(
        <div id="locationList">
            <ul style={{listStyleType: "none", padding: 0, margin: 0}}>
                {markers.map((marker) => 
                    <li key={marker.id}>
                        <p>{marker.name}</p>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Locations;