import React from 'react'
import Link from 'gatsby-link'
import { auth } from '../../firebase'

const SignOutButton = props =>
    props.button?
    <button 
  		type="button" 
  		onClick={auth.doSignOut}
  	>
  		Sign Out
  	</button>:
    <Link
    	onClick={auth.doSignOut}
    	to='/'
    >
    	Sign Out
    </Link>

export default SignOutButton;
