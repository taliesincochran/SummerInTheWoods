import React from 'react';
import PropTypes from 'prop-types';
import Navigation from '../Navigation';
const Menu = (props) => {
	return(
	    <nav id="menu">
	        <div className="inner">
				<Navigation
					button={false}
					onToggleMenu={props.onToggleMenu}
					{...props} 
				/>
	            <ul className="actions vertical">
	            </ul>
	        </div>
	        <button className="close" onClick={props.onToggleMenu}>Close</button>
	    </nav>
	)
}

Menu.propTypes = {
    onToggleMenu: PropTypes.func
}

export default Menu
