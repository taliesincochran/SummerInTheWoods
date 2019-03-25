import React from 'react';
import linkArray from '../../constants/linkArray'
import LinkItem from '../LinkItem'
const linkList = [
    {
        href: 'https://www.facebook.com/freeplayisparamount/',
        text: 'Facebook Page'
    }, 
    {
        href: 'https://www.instagram.com/explore/tags/summerinthewoodscamp/top/?hl=en',
        text: 'Instagram'
    }
];
const Navigation = (props) => {
    return(
        <ul className="links">
            {  
                linkArray.map((listItem, i) => (listItem.nonAuth && props.pathname !== listItem.path) ?
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
                : 
                ''
                )
            }
            { 
                linkList.map(item => {
                    return (
                        <li>
                            {props.button?
                                <button type="button">
                                    <a href={item.href} target="_blank">
                                        <span className="label">
                                            {item.text}
                                        </span>
                                    </a>
                                </button>
                                :
                                <a href={item.href} target="_blank">
                                    <span className="label">
                                        {item.text}
                                    </span>
                                </a>
                            }
                        </li>
                    )
                })
            }
        </ul>
    )
}
export default Navigation


