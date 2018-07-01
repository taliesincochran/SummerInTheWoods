import React from 'react';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';

const Menu = (props) => {
	console.log("menu props", props)
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
