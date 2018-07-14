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
    path: routes.ADMIN_PARENT_ACCOUNTS,
    text: "Parent Accounts",
    admin: true
  },
  {
    path: routes.ADMIN_CALENDAR_EDITOR,
    text: "Calendar Editor",
    admin: true
  },
  {
    path: routes.ADMIN_APPLICATION_VIEW,
    text: "View Applications",
    admin: true
  },
  {
    path: routes.ADMIN_PARENT_SIGN_UP,
    text: "Add New Parent",
    admin: true
  },
  {
    path: routes.ACCOUNT,
    text: "Your Account",
    auth: true
  }, 
  {
    path: routes.STAFF,
    text: 'Our Staff',
    auth: true,
    nonAuth:true
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
    nonAuth:true
  },
  {
    path: routes.PASSWORD_CHANGE,
    text: 'Change Password',
    admin: true,
    auth: true
  },
  {
    path: routes.CALENDAR,
    text: 'Calendar',
    admin: true,
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