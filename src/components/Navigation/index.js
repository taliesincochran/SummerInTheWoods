import React from 'react';
import linkArray from '../../constants/linkArray'
import LinkItem from '../LinkItem'

const Navigation = (props) => {
    return(
        <ul className="links">
            {linkArray.map((listItem, i) => (listItem.nonAuth && props.pathname !== listItem.path) ?
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
                : '')
            }
            <li>
                {props.button?
                    <button type="button">
                        <a href="https://www.facebook.com/freeplayisparamount/" target="_blank">
                            <span className="label">
                                Facebook Page
                            </span>
                        </a>
                    </button>
                : 
                    <a href="https://www.facebook.com/freeplayisparamount/" target="_blank">
                        <span className="label">
                            Facebook Page
                        </span>
                    </a>
                }
                    
            </li>
        </ul>
    )
}
export default Navigation


