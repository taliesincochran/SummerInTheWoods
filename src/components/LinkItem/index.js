import React from 'react';
import Link from 'gatsby-link';
const LinkItem = props => {
    let path = props.path;
    let state = props.state
    return(
        props.button?
        (
            <li>
                <Link 
                    onClick={props.onToggleMenu} 
                    to={{
                        pathname: path,
                        state: props.state
                    }}
                >
                    <button type="button" className='button'>
                        {props.text}
                    </button>
                </Link>
            </li>
        ):(
            <li>
                <Link 
                    onClick={props.onToggleMenu} 
                    to={{
                        pathname: path,
                        state: state
                    }}
                >
                    {props.text}
                </Link>
            </li>
        )
    )
}
export default LinkItem