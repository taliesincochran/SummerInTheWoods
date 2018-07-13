import React from 'react'
import Link from 'gatsby-link'
import AuthUserContext from '../Session/AuthUserContext'
import SignOut from '../SignOut'
import * as routes from '../../constants/routes'
import linkArray from '../../constants/linkArray'
import LinkItem from '../LinkItem'
import NavigationAuth from '../NavigationAuth'
import NavigationNonAuth from '../NavigationNonAuth'

const Navigation = (props) => {
    return(
    <AuthUserContext.Consumer>
        {authUser => authUser
          ? <NavigationAuth 
              auth={authUser} 
              admin={props.admin} 
              email={authUser.email} 
              onToggleMenu={props.onToggleMenu}
              pathname={props.pathname} 
              button={props.button}
              state={props.state}
              handleChange={props.handleChange}
              handleYearChange={props.handleYearChange}
            />
          : <NavigationNonAuth 
              auth={authUser} 
              onToggleMenu={props.onToggleMenu} 
              pathname={props.pathname} 
              button={props.button}
              state={props.state}
              handleChange={props.handleChange}
              handleYearChange={props.handleYearChange}
            />
        }
    </AuthUserContext.Consumer>
      )
}
export default Navigation


