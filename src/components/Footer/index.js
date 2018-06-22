import React from 'react';
import Link from 'gatsby-link';
import SignOut from '../SignOut'
const Footer = (props) => {
    console.log(props.pathname, props.auth);
    return(
    <footer id="footer">
        <div className="inner">
            <ul className="icons">
                {/*<li><a href="#" className="icon alt fa-twitter"><span className="label">Twitter</span></a></li>*/}
                <li><a href="https://www.facebook.com/freeplayisparamount/" className="icon alt fa-facebook"><span className="label">Facebook</span></a></li>
                {props.pathname=="/contact"?"":(
                    <li><Link to="/contact" className="button">Contact</Link></li>
                )}
                {props.pathname=="/"?"":(
                    <li><Link to="/" className="button">Home</Link></li>
                )}
    
                {props.pathname=="/calendar"?"":(             
                    <li><Link to="/calendar" className="button">Availability</Link></li>
                )}
                {props.auth == null && props.pathname !=="/signin"?
                    <li><Link to="/signin" className="button">Parent Login</Link></li>
                :""}
                {props.auth !== null?<SignOut/>:''

                }

            </ul>
            <ul className="copyright">
                <li>&copy; Taliesin Cochran 2018</li><li>Design: <a href="https://html5up.net">HTML5 UP</a></li>
            </ul>
        </div>
    </footer>
)}

export default Footer
