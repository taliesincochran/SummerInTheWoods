import React from 'react';
import Navigation from '../Navigation'

const Footer = (props) => {
    return(
    <footer id="footer">
        <div className="inner">
            <ul className="icons">
                <Navigation
                    button={true}
                    firebase={props.firebase}
                    pathname={props.pathname}
                    state={props.state}
                />
            </ul>
            <ul className="copyright">
                <li>&copy; Taliesin Cochran and Vytas Rudinskas</li><li>Design: <a href="https://html5up.net">HTML5 UP</a></li>
            </ul>
        </div>
    </footer>
)}

export default Footer
