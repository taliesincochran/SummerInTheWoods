import React from 'react';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';

const Footer = (props) => (
    <footer id="footer">
        <div className="inner">
            <ul className="icons">
                {/*<li><a href="#" className="icon alt fa-twitter"><span className="label">Twitter</span></a></li>*/}
                <li><a href="#" className="icon alt fa-facebook"><span className="label">Facebook</span></a></li>
                <li><a href="#" className="icon alt fa-instagram"><span className="label">Instagram</span></a></li>
                {props.pathname=="/contact"?"":(
                    <li><Link to="/contact" className="button">Contact</Link></li>
                )}
                {props.pathname=="/"?"":(
                    <li><Link to="/" className="button">Home</Link></li>
                )}
    
                {/*
                //To Do
                
                <li><Link to="/availability" className="button">Availability</Link></li>
                <li><Link to="/login" className="button">Parent Login</Link></li>
                */}

            </ul>
            <ul className="copyright">
                <li>&copy; Taliesin Cochran 2018</li><li>Design: <a href="https://html5up.net">HTML5 UP</a></li>
            </ul>
        </div>
    </footer>
)
Footer.propTypes = {
    pathname: PropTypes.string
}
export default Footer
