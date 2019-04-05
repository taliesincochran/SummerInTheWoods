import React from 'react';
import linkArray from '../../constants/linkArray';
import LinkItem from '../LinkItem';
import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROLES from '../../constants/roles';

const LinkList = [
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
  return (
    (props.firebase !== null)?
      (<AuthUserContext.Consumer>
        {authUser =>
          authUser ? (
            <NavigationAuth authUser={authUser} {...props}/>
          ) : (
            <NavigationNonAuth {...props}/>
          )
        }
      </AuthUserContext.Consumer>)
    :
      null
)};

const NavigationAuth = (props) =>  {
  return(
    <ul className="links">
      {linkArray.map((listItem, i) =>
        (listItem.auth && props.pathname !== listItem.path) ?
          <LinkItem
            key={listItem.path}
            path={listItem.path}
            button={props.button}
            text={listItem.text}
            state={props.state}
            handleChange={props.handleChange}
            handleYearChange={props.handleYearChange}
            onToggleMenu={props.onToggleMenu}
            firebase={props.firebase}
          />
          : '')}
      {props.authUser.roles.includes(ROLES.ADMIN) && (
          linkArray.map((listItem, i) =>
            (listItem.admin && props.pathname !== listItem.path) ?
              <LinkItem
                key={listItem.path}
                path={listItem.path}
                button={props.button}
                text={listItem.text}
                state={props.state}
                handleChange={props.handleChange}
                handleYearChange={props.handleYearChange}
                onToggleMenu={props.onToggleMenu}
                firebase={props.firebase}
              />
              : '')
        )}
        {LinkList.map((item, i) => 
          <li>
            {props.button ?
              <button type="button" key={item.href}>
                <a href={item.href} target="_blank">
                  <span className="label">
                    {item.text}
                  </span>
                </a>
              </button>
            :
              <a href={item.href} target="_blank" key={item.href}>
                <span className="label">
                  {item.text}
                </span>
              </a>
            }
          </li>
        )}
      <li>
        <SignOutButton />
      </li>
    </ul>
  )
};

const NavigationNonAuth = (props) => {
  return (
  <ul>
    {linkArray.map((listItem, i) => (listItem.nonAuth && props.pathname !== listItem.path)?
			<LinkItem
        key={listItem.path}
        path={listItem.path}
        button={props.button}
        text={listItem.text}
        state={props.state}
        handleChange={props.handleChange}
        handleYearChange={props.handleeYearChange}
        onToggleMenu={props.onToggleMenu}
        firebase={props.firebase} firebase={props.firebase}
      />
      :null
    )}
    {LinkList.map(item =>
      <li key={item.href}>
        {props.button ?
          <button
            type="button"
            >
            <a
              href={item.href}
              target="_blank"
            >
              <span className="label">
                {item.text}
              </span>
            </a>
          </button>
          :
          <a
            href={item.href}
            target="_blank"
          >
            <span className="label">
              {item.text}
            </span>
          </a>
        }
      </li>
    )}
  </ul>
)};

export default Navigation;
