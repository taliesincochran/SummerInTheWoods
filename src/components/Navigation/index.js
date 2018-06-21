import React from 'react';
import Link from 'gatsby-link';

import AuthUserContext from '../Session/AuthUserContext';
import SignOutButton from '../SignOut';
import * as routes from '../../constants/routes';

const Navigation = (props) => {
  console.log('nav props 1', props);
  return(
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth auth={authUser} admin={props.admin} email={authUser.email} onToggleMenu={props.onToggleMenu} />
      : <NavigationNonAuth auth={authUser} onToggleMenu={props.onToggleMenu} />
    }
  </AuthUserContext.Consumer>
    )
}

const NavigationAuth = (props) => {
  console.log('nav props', props);
  return(
  props.email ==  "tdcochran2@gmail.com" || "mdsch.jackie@gmail.com" || "lernerandrew@gmail.com" || 'viskaslietuvai@gmail.com' || "tripsrmeplus11@gmail.com"?
  (<ul className="links">
      <li><Link onClick={props.onToggleMenu} to={routes.ADMIN}>Admin</Link></li>
      <li><Link onClick={props.onToggleMenu} to={routes.HOME}>Home</Link></li>
      <li><Link onClick={props.onToggleMenu} to={routes.SIGN_UP}>Sign Up New User</Link></li>
      <li><Link onClick={props.onToggleMenu} to={routes.PASSWORD_CHANGE}>Change Password</Link></li>
      <li><SignOutButton /></li>
    </ul>):
  (<ul className="links">
      <li><Link onClick={props.onToggleMenu} to={routes.HOME}>Home</Link></li>
      <li><Link onClick={props.onToggleMenu} to={routes.ACCOUNT}>Account</Link></li>
      <li><Link onClick={props.onToggleMenu} to={routes.PASSWORD_CHANGE}>Change Password</Link></li>
      <li><SignOutButton /></li>
    </ul>)
    )
}

const NavigationNonAuth = (props) => {
  console.log('nav props', props);
  return(
  <ul className="links">
    <li><Link onClick={props.onToggleMenu} to={routes.HOME}>Home</Link></li>
    <li><Link onClick={props.onToggleMenu} to={routes.SIGN_IN}>Sign In</Link></li>
  </ul>
  )}

export default Navigation;
