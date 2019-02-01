import * as React from 'react'
import NavigationAuth from '../NavigationAuth'
import NavigationNonAuth from '../NavigationNonAuth'



class Navigation extends React.Component {
    componentDidMount() {
        console.log('navigation context', this.props.context)
    }
    render () {
        return(
            this.props.authorized
            ?
             <NavigationAuth 
                auth={this.props.authorized} 
                admin={this.props.admin} 
                onToggleMenu={this.props.onToggleMenu}
                pathname={this.props.pathname} 
                button={this.props.button}
                state={this.props.state}
                handleChange={this.props.handleChange}
                handleYearChange={this.props.handleYearChange}
                />
                :  
            <NavigationNonAuth 
                onToggleMenu={this.props.onToggleMenu} 
                pathname={this.props.pathname} 
                button={this.props.button}
                state={this.props.state}
                handleChange={this.props.handleChange}
                handleYearChange={this.props.handleYearChange}
                />
                
      )
    }
}
export default Navigation;

