import React from 'react';
import Link from 'gatsby-link';
import SignOut from '../SignOut'
import LinkArray from '../../constants/linkArray'
import Navigation from '../Navigation'
import * as routes from '../../constants/routes';

const Footer = (props) => {
    console.log("Footer props", props);
    return(
    <footer id="footer">
        <div className="inner">
            <ul className="icons">
                <li><a href="https://www.facebook.com/freeplayisparamount/" className="icon alt fa-facebook"><span className="label">Facebook</span></a></li>
                <li><a href="#" className="icon alt fa-instagram"><span className="label">Instagram</span></a></li>
                <Navigation button={true} pathname={props.pathname} state={props.state} />

            </ul>
            <ul className="copyright">
                <li>&copy; Taliesin Cochran 2018</li><li>Design: <a href="https://html5up.net">HTML5 UP</a></li>
            </ul>
        </div>
    </footer>
)}

export default Footer
