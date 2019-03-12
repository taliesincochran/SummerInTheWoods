import React from 'react';
import PropTypes from 'prop-types';

const Menu = (props) => {
	return(
	    <nav id="menu">
	        <div className="inner">
	                {props.children}            
	            <ul className="actions vertical">
	            </ul>
	        </div>
	        <a className="close" onClick={props.onToggleMenu} href="javascript:;">Close</a>
	    </nav>
	)
}

Menu.propTypes = {
    onToggleMenu: PropTypes.func
}

export default Menu
