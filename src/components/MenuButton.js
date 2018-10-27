import React from "react";
import './../App.css';

const MenuButton = ( props) => {
        return (
            <div title="Toggle Sidebar" role="button" aria-label="Toggle Menu"
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