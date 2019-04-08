import React from 'react';
import { Link } from '@reach/router';
import { fromRenderProps } from 'recompose';
import { navigate } from 'gatsby';
const LinkItem = props => {
    const handleClick = event => {
        const { value } = event.target;
        let toggleMenu = () => props.onToggleMenu();
        toggleMenu();
        navigate([value], {...props});
    }
    const state = props.state;
    return(
        <li>
            {props.button?
            (
                <button
                    type="button" 
                    className='button'
                    onClick={handleClick}
                    value={props.path}
                >
                    {props.text}
                </button>
            ):(
                <button
                    onClick={handleClick}
                    value={props.path}
                >
                    {props.text}
                </button>
            )}
        </li>
    )
}
export default LinkItem