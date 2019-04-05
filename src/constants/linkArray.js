import React from 'react'
import * as routes from './routes'

const linkArray = [
  {
    path: routes.HOME,
    text: "Home",
    admin: true,
    auth: true,
    nonAuth: true
  },
  {
    path: routes.APPLY,
    text: 'Apply',
    nonAuth:true
  },
  {
    path: routes.CONTACT,
    text: 'Contact Us',
    auth: true,
    nonAuth: true
  },
  {
    path: routes.CALENDAR,
    text: 'Calendar',
    admin: true,
    auth: true,
    nonAuth: true
  },
  {
    path: routes.PRICES,
    text: 'Prices',
    admin: true,
    auth: true,
    nonAuth: true
  },
  {
    path: routes.SIGN_IN,
    text: 'Sign In',
    nonAuth: true
  },
  {
    path: routes.ADMIN_APPLICATION_VIEW,
    text: 'View Applications',
    admin: true
  }
]
export default linkArray