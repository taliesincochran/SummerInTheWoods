import React from 'react';
import Link from 'gatsby-link';
import SignOut from '../SignOut';
import * as routes from '../../constants/routes';
import linkArray from '../../constants/linkArray'
import LinkItem from '../LinkItem'

const NavigationNonAuth = (props) => {
    return(
  		<ul className="links">
      		{linkArray.map((listItem, i) => (listItem.nonAuth && props.pathname !== listItem.path)?
		      	<LinkItem 
		      		key={i} 
		      		path={listItem.path} 
		      		button={props.button} 
		      		text={listItem.text} 
		      		state={props.state} 
		      		handleChange={props.handleChange} 
		      		handleYearChange={props.handleYearChange}
		      		onToggleMenu={props.onToggleMenu}
		      	/>
		      	:'')
  			}
      <li><SignOut button={props.button}/></li>
  </ul>
  )}

export default NavigationNonAuth;
