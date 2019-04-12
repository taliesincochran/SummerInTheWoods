import React from 'react';
import PropTypes from 'prop-types';
import Navigation from '../Navigation';
const Menu = (props) => {
	return(
	    <nav id="menu">
	        <div className="inner">
				<Navigation
					button={false}
					handleToggleMenu={props.handleToggleMenu}
					{...props} 
				/>
	            <ul className="actions vertical">
	            </ul>
	        </div>
	        <a className="close" onClick={props.onToggleMenu} href="javascript:void('open menu');">Close</a>
	    </nav>
	)
}

Menu.propTypes = {
    onToggleMenu: PropTypes.func
}

export default Menu
