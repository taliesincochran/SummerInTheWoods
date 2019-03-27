import React from 'react';
import SignOut from '../SignOut';
import linkArray from '../../constants/linkArray'
import LinkItem from '../LinkItem'

const NavigationAuth = (props) => {
	return(
		<ul className="links">
			{linkArray.map((listItem, i) => 
				(listItem.auth && props.pathname !== listItem.path)?
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
			:'')}
				<li><SignOut button={props.button}/></li>
		</ul>
	)
}
export default NavigationAuth;