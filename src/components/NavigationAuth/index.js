import React from 'react';
import Link from 'gatsby-link';
import SignOut from '../SignOut';
import * as routes from '../../constants/routes';
import linkArray from '../../constants/linkArray'
import LinkItem from '../LinkItem'

const NavigationAuth = (props) => {
    return(
        props.email ==  ("tdcochran2@gmail.com" || "mdsch.jackie@gmail.com" || "lernerandrew@gmail.com" || 'viskaslietuvai@gmail.com' || "tripsrmeplus11@gmail.com")?
            (<ul className="links">
                {linkArray.map((listItem, i) =>{
                console.log("These are the auth props", props); 
                  (listItem.admin && props.pathname !== listItem.path)?
                    <LinkItem 
                      key={i} 
                      path={listItem.path} 
                      button={props.button} 
                      text={listItem.text} 
                      state={props.state} 
                      handleChange={props.handleChange} 
                      handleYearChange={props.handleYearChange}
                      onToggleMenu={props.onToggleMenu}
                    />:''})}
                <li><SignOut button={props.button}/></li>
              </ul>):
            (
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
                      />:'')}
                  <li><SignOut button={props.button}/></li>
              </ul>
            )
    )
}
export default NavigationAuth;