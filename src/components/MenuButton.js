import React from "react";
import './../App.css';

const MenuButton = ( props) => {
        return (
            <div title="Toggle Sidebar" 
                 className={(props.showSidebar ? 'hamburger-button' : 'hamburger-button-alone')}
                 type="button" 
                 onClick={() => props.handleSideBarToggle()}
            >
                <div></div>
                <div></div>
                <div></div>
            </div>
        )
}

export default MenuButton;