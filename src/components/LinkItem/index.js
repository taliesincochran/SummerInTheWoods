import React from 'react';
import { Link } from '@reach/router';
import { fromRenderProps } from 'recompose';
const LinkItem = props => {
    const state = props.state;
    return(
        <li>
            {props.button?
            (
                <Link
                    onClick={props.onToggleMenu}
                    to={props.path}
                    state={props}
                >
                    <button type="button" className='button'>
                        {props.text}
                    </button>
                </Link>
            ):(
                <Link
                    onClick={props.onToggleMenu}
                    to={props.path}
                    state={props}
                >
                    {props.text}
                </Link>
            )}
        </li>
    )
}
export default LinkItem