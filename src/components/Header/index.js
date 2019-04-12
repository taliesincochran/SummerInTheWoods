import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => (
    <header id="header" className="alt">
        {/*<Link to="/" className="logo"><strong>Forty</strong> <span>by HTML5 UP</span></Link>*/}
        <nav>
            <button className="menu-link" onClick={props.onToggleMenu} href="javascript:;">Menu</button>
        </nav>
    </header>
)

Header.propTypes = {
    onToggleMenu: PropTypes.func
}

export default Header
