import React from 'react';
import Link from 'gatsby-link';
const LinkItem = props => {
    return(
        <li>
            {props.button?
            (
                <Link 
                    onClick={props.onToggleMenu} 
                    to={{
                        pathname: props.path,
                        state: props.state
                    }}
                >
                    <button type="button" className='button'>
                        {props.text}
                    </button>
                </Link>
            ):(
                <Link 
                    onClick={props.onToggleMenu} 
                    to={{
                        pathname: props.path,
                        state: props.state
                    }}
                >
                    {props.text}
                </Link>
            )}
        </li>
    )
}
export default LinkItem