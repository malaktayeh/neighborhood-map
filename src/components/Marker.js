import React from 'react';
import { MarkerStyle } from './Marker.css'
import MarkerSVG from '../map-pin.svg'

export const  Marker = ({ text }) => {
    return (
        <div style={MarkerStyle}>
            <img src={MarkerSVG} />
            {text}
        </div>
    );
}
