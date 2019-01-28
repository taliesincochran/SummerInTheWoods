import React from 'react'
import AuthUserContext from '../Session/AuthUserContext'
import NavigationAuth from '../NavigationAuth'
import NavigationNonAuth from '../NavigationNonAuth'

export default class Navigation extends React.Component {
    
    render () {
        return(
            <AuthUserContext.Consumer>
                {authUser => authUser
                ?
                 <NavigationAuth 
                    auth={authUser} 
                    admin={this.props.admin} 
                    email={authUser.email} 
                    onToggleMenu={this.props.onToggleMenu}
                    pathname={this.props.pathname} 
                    button={this.props.button}
                    state={this.props.state}
                    handleChange={this.props.handleChange}
                    handleYearChange={this.props.handleYearChange}
                    />
                    : 
                    <NavigationNonAuth 
                        // auth={authUser} 
                        onToggleMenu={this.props.onToggleMenu} 
                        pathname={this.props.pathname} 
                        button={this.props.button}
                        state={this.props.state}
                        handleChange={this.props.handleChange}
                        handleYearChange={this.props.handleYearChange}
                    />
                }
            </AuthUserContext.Consumer>
      )
    }
}


