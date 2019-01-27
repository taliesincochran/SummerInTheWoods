import * as React from "react";
import Navigation from '../Navigation';

const Footer = (props) => {
    return(
    <footer id="footer">
        <div className="inner">
            <ul className="icons">
                <ul>
                    <li><a href="https://www.facebook.com/freeplayisparamount/" target="_blank" className="icon alt fa-facebook"><span className="label">Facebook</span></a></li>
                    {/*<li><a href="#" className="icon alt fa-instagram"><span className="label">Instagram</span></a></li>*/}
                </ul>
                <Navigation button={true} pathname={props.pathname} state={props.state} />
            </ul>
            <ul className="copyright">
                <li>&copy; Trakai Web Development</li><li>Design: <a href="https://html5up.net">HTML5 UP</a></li>
            </ul>
        </div>
    </footer>
)}

export default Footer
