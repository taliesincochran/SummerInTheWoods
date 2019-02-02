import React from 'react'
import * as routes from './routes'

const linkArray = [
  {
    path: routes.HOME,
    text: "Home",
    auth: true,
    nonAuth: true
  },
  {
    path: routes.ADMIN_CALENDAR_EDITOR,
    text: "Calendar Editor",
    auth: true
  },
  {
    path: routes.ADMIN_APPLICATION_VIEW,
    text: "View Applications",
    auth: true
  },
  {
    path: routes.APPLY,
    text: 'Apply',
    nonAuth: true,
    auth: true
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
    auth: true,
    nonAuth: true
  },
  {
    path: routes.SIGN_IN,
    text: 'Sign In',
    nonAuth: true
  }
]
export default linkArray