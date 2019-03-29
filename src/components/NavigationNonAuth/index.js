import React from 'react';
import linkArray from '../../constants/linkArray'
import LinkItem from '../LinkItem'

const NavigationNonAuth = (props) => {
    return(
			<ul className="links">
				{
					linkArray.map((listItem, i) => (listItem.nonAuth && props.pathname !== listItem.path)?
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
			</ul>
  )}

export default NavigationNonAuth;
