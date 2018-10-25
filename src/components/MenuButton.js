import React from "react";
import './../App.css';

class MenuButton extends React.PureComponent {

    render() {
        return (
            <div title="Toggle Sidebar" 
                 className={(this.props.showSidebar ? 'hamburger-button' : 'hamburger-button-alone')}
                 type="button" 
                 onClick={() => this.props.handleSideBarToggle()}
            >
                <div></div>
                <div></div>
                <div></div>
            </div>
        )
    }


};

export default MenuButton;